'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - tslint - src\webparts\popupModal\components\MYModal.tsx(32,29): error no-use-before-declare: variable 'contentStyles' used before declaration`);
build.addSuppression(`Warning - [sass] The local CSS class 'body-199' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'button-200' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] src\webparts\faqs\components\styles.scss: filename should end with module.sass or module.scss`);
build.addSuppression(`Warning - [sass] src\webparts\popupModal\components\styles.scss: filename should end with module.sass or module.scss`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));