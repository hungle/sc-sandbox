// ==========================================================================
// Project:   SandBox.ImageButtonView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SalePoint */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SandBox.ImageButtonView = SC.ButtonView.extend(
/** @scope SandBox.ImageButtonView.prototype */ {
  
  classNames: ['image-label'],

  needsEllipsis: NO,

  renderStyle: 'renderImageLabel', //SUPPORTED DEFAULT, IMAGE

  /**
    Render the button with the default render style.
  */
  renderImageLabel: function(context, firstTime) {
    this.renderTitle(context, firstTime) ; // from button mixin
  
  }

}); 
