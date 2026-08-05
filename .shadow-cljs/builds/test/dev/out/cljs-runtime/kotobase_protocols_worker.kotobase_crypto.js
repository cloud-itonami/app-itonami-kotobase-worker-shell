goog.provide('kotobase_protocols_worker.kotobase_crypto');
/**
 * Index-component blind token (keyed MAC in the real profile). Passthrough:
 *   the component itself, so prolly-tree leaf keys/prefix seeks stay the
 *   plaintext `pr-str` encoding.
 */
kotobase_protocols_worker.kotobase_crypto.blind_fn = (function kotobase_protocols_worker$kotobase_crypto$blind_fn(component){
return Promise.resolve(component);
});
/**
 * Whole-payload AEAD in the real profile. Passthrough: the plaintext bytes.
 */
kotobase_protocols_worker.kotobase_crypto.encrypt_fn = (function kotobase_protocols_worker$kotobase_crypto$encrypt_fn(bytes){
return Promise.resolve(bytes);
});
/**
 * Inverse of `encrypt-fn`. Passthrough: the stored bytes.
 */
kotobase_protocols_worker.kotobase_crypto.decrypt_fn = (function kotobase_protocols_worker$kotobase_crypto$decrypt_fn(bytes){
return Promise.resolve(bytes);
});

//# sourceMappingURL=kotobase_protocols_worker.kotobase_crypto.js.map
