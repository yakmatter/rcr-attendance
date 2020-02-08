import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import config from '../config/environment';
import { isEmpty } from '@ember/utils';
import {
  merge,
  assign as emberAssign
} from '@ember/polyfills';
import RSVP from 'rsvp';
import { makeArray } from '@ember/array';
import { run } from '@ember/runloop';
import { deprecate } from '@ember/application/deprecations';
const assign = emberAssign || merge;

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${config.apiHost}/authentication`,
  serverTokenRevocationEndpoint: `${config.apiHost}/users/logout`,

  /*
    override to inject `strategy: 'local'`
   */
  authenticate(identification, password, scope = [], headers = {}) {
    if (!this.get('sendClientIdAsQueryParam')) {
      deprecate(`Ember Simple Auth: Client ID as Authorization Header is deprecated in favour of Client ID as Query String Parameter.`,
        false,
        {
          id: 'ember-simple-auth.oauth2-password-grant-authenticator.client-id-as-authorization',
          until: '2.0.0',
          url: 'https://github.com/simplabs/ember-simple-auth#deprecation-of-client-id-as-header',
        }
      );
    }

    return new RSVP.Promise((resolve, reject) => {
      const data = { 'strategy': 'local', email: identification, password };
      const serverTokenEndpoint = this.get('serverTokenEndpoint');
      const useResponse = this.get('rejectWithResponse');
      const scopesString = makeArray(scope).join(' ');
      if (!isEmpty(scopesString)) {
        data.scope = scopesString;
      }
      this.makeRequest(serverTokenEndpoint, data, headers).then((response) => {
        run(() => {
          if (response.accessToken) {
            /* override, convert to snake_case */
            response.access_token = response.accessToken;
          }
          if (!this._validate(response)) {
            reject('access_token is missing in server response');
          }

          const expiresAt = this._absolutizeExpirationTime(response['expires_in']);
          this._scheduleAccessTokenRefresh(response['expires_in'], expiresAt, response['refresh_token']);
          if (!isEmpty(expiresAt)) {
            response = assign(response, { 'expires_at': expiresAt });
          }

          resolve(response);
        });
      }, (response) => {
        run(null, reject, useResponse ? response : (response.responseJSON || response.responseText));
      });
    });
  },

});
