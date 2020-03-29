import {
  default as discourseComputed,
  on
} from 'discourse-common/utils/decorators';
import { profileFields } from '../lib/custom-wizard';
import { scheduleOnce } from "@ember/runloop";

export default Ember.Component.extend({
  classNames: 'wizard-text-editor',
  barEnabled: true,
  previewEnabled: true,
  fieldsEnabled: true,
  
  didReceiveAttrs() {
    this._super(...arguments);
    if (!this.barEnabled) {
      scheduleOnce('afterRender', () => {
        $(this.element).find('.d-editor-button-bar').addClass('hidden');
      });
    }
  },
  
  @discourseComputed('forcePreview')
  previewLabel(forcePreview) {
    return I18n.t("admin.wizard.editor.preview", {
      action: I18n.t(`admin.wizard.editor.${forcePreview ? 'hide' : 'show'}`)
    });
  },
  
  @discourseComputed('showPopover')
  popoverLabel(showPopover) {
    return I18n.t("admin.wizard.editor.popover", {
      action: I18n.t(`admin.wizard.editor.${showPopover ? 'hide' : 'show'}`)
    });
  },
  
  @discourseComputed()
  userFieldList() {
    return profileFields.map((f) => ` u{${f}}`);
  },
  
  @discourseComputed('wizardFields')
  wizardFieldList(wizardFields) {
    return wizardFields.map((f) => ` w{${f.id}}`);
  },
  
  actions: {
    togglePreview() {
      this.toggleProperty('forcePreview');
    },
    
    togglePopover() {
      this.toggleProperty('showPopover');
    }
  }
});