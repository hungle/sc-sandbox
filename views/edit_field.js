// ==========================================================================
// Project:   SalePoint
// Copyright: ©2010 Fidura, LLC
// ==========================================================================
/*globals SalePoint */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SandBox.EditFieldView = SC.View.extend(
/** @scope SandBox.EditFieldView.prototype */ {

  // field view needs to support editable
  fieldView: null,

  // The control views starting layout positions
  controlPos: null,

  // The left padding for the control views
  controlLeftPadding: 10,
  
  isEditing: NO,

  /**
   Create this view class child views.
  */
  createChildViews: function() {

    var childViews = [];
    var fieldView = this.get('fieldView');
    var controlPos = this.get('controlPos');
    var controlView, fieldViewLayout;
    
    // First make sure we have a field View
    if (!fieldView) {
      console.error('The fieldView is not defined!');
      return this;
    }

    // Then create the field view
    fieldView = this.createChildView(this.fieldView);
    fieldView.bind('isEditing', this, 'isEditing');
    this.set('fieldView', fieldView);
    childViews.push(fieldView);

    // Check to see if user provided control positions, if not we try to derive it
    if (!controlPos) {
      controlPos = {};
      fieldViewLayout = fieldView.layout;

      // Copy the top and left positions
      controlPos.top = fieldViewLayout.top;
      controlPos.left = fieldViewLayout.left + fieldViewLayout.width + this.get('controlLeftPadding');
    }

    // **
    // Create the edit control view.
    // By default position it to top right of the field view
    // **
    controlView = this.createChildView(this.get('editControlView'));
    controlView.adjust(controlPos);
    this.set('editControlView', controlView);
    childViews.push(controlView);

    // **
    // Create the commit control view.
    // By default position it to top right of the field view
    // **
    controlView = this.createChildView(this.get('commitControlView'));
    controlView.adjust(controlPos);
    controlPos.left += controlView.get('layout').width;
    this.set('commitControlView', controlView);
    childViews.push(controlView);
    
    // **
    // Create the discard control view.
    // By default position it to top right of the field view with 2x
    // the padding value!
    // **
    controlView = this.createChildView(this.get('discardControlView'));
    controlPos.left += this.get('controlLeftPadding');
    controlView.adjust(controlPos);
    this.set('discardControlView', controlView);
    childViews.push(controlView);

    this.set('childViews', childViews);
    return this;
        
  },

  /**
   Mouse entered the view area
   */
  mouseEntered: function() { 
    if (!this.get('isEditing')) this.get('editControlView').set('isVisible', YES);
  },

  /**
   Mouse exited the view area
  */
  mouseExited: function() {
    if (!this.get('isEditing')) this.get('editControlView').set('isVisible', NO);
  },

  /**
   Update the control views visibility and put the field view into editing mode.
  */
  beginEditing: function() {
    //if (this.get('fieldView').get('isEditing')) return YES;
    if (this.get('isEditing')) return YES;
    //this.set('isEditing', YES);

    this.get('editControlView').set('isVisible', NO);
    this.get('commitControlView').set('isVisible', YES);
    this.get('discardControlView').set('isVisible', YES);

    //this.becomeFirstResponder() ;

    this.get('fieldView').set('isEditable', YES);
    return this.get('fieldView').beginEditing();
  },
  
  /**
   Update the control views visibility and tell the field view to commit.
  */
  commitEditing: function() {
    console.log('commit');
    if (!this.get('isEditing')) return YES;
    console.log('commit really');

    this.get('editControlView').set('isVisible', YES);    
    this.get('commitControlView').set('isVisible', NO);
    this.get('discardControlView').set('isVisible', NO);

    //this.resignFirstResponder() ;
    
    this.get('fieldView').set('isEditable', NO);
    return this.get('fieldView').commitEditing();      
  },
  
  /**
   Update the control views visibility and tell the field view to discard.
  */
  discardEditing: function() {
    console.log('discard');
    if (!this.get('isEditing')) return YES;
    console.log('discarding really');

    this.get('editControlView').set('isVisible', YES);
    this.get('commitControlView').set('isVisible', NO);
    this.get('discardControlView').set('isVisible', NO);

    //this.resignFirstResponder() ;

    this.get('fieldView').set('isEditable', NO);
    return this.get('fieldView').discardEditing();    
  },


  editControlView: SC.LabelView.extend({
    layout: { left: 0, top: 0, width: 22, height: 19 },
    isVisible: NO,
    value: 'Edit',
    
    mouseDown: function() {
      this.parentView.beginEditing();
    }
  }),

  commitControlView: SC.LabelView.extend({
    layout: { left: 0, top: 0, width: 25, height: 19 },
    isVisible: NO,
    value: 'Save',
    
    mouseDown: function() {
      this.parentView.commitEditing();
    } 
  }),

  discardControlView: SC.LabelView.extend({
    layout: { left: 0, top: 0, width: 40, height: 19 },
    isVisible: NO,
    value: 'Cancel',
    
    mouseDown: function() {
      this.parentView.discardEditing();
    } 
  })


});
