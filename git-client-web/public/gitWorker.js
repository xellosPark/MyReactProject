importScripts('https://cdn.jsdelivr.net/npm/browserfs@1.4.3/dist/browserfs.min.js');
importScripts('https://cdn.jsdelivr.net/npm/isomorphic-git@1.25.10/dist/index.umd.min.js');
importScripts('https://cdn.jsdelivr.net/npm/isomorphic-git/http/web/index.umd.min.js');

self.onmessage = async function (e) {
  const { url, dir } = e.data;
  let logMessages = [];

  BrowserFS.configure({ fs: "IndexedDB", options: {} }, function (err) {
    if (err) {
      logMessages.push(`BrowserFS 구성 중 오류: ${err.message}`);
      self.postMessage({ success: false, logMessages });
      return;
    }

    const fs = BrowserFS.BFSRequire('fs');
    git.plugins.set('fs', fs);

    logMessages.push(`저장소를 ${url}에서 ${dir}로 복제 시작`);

    git.clone({
      fs,
      http: git.http,
      dir,
      url,
      corsProxy: 'https://cors.isomorphic-git.org'
    }).then(() => {
      logMessages.push('저장소 복제 성공');
      self.postMessage({ success: true, logMessages });
    }).catch((error) => {
      logMessages.push(`저장소 복제 중 오류: ${error.message}`);
      self.postMessage({ success: false, logMessages });
    });
  });
};