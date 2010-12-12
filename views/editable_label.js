// ==========================================================================
// Project:   SandBox.EditableLabelView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SalePoint */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SandBox.EditableLabelView = SC.LabelView.extend(
/** @scope SandBox.EditableLabelView.prototype */ {

  exampleInlineTextFieldView: SC.InlineTextFieldView.extend({

    /**
     Overrides auto committing when field loses focus to do nothing.
    */
    fieldDidBlur: function(evt) {
      //console.log('field did blur');
      //this.resignFirstResponder();
    },

    /**
     Overrides default behavior such that lost of focus will
     not cause inline editor to end.
    */        
    blurEditor: function(evt) {
      //console.log('blur editor');    
      return YES;
    },

    /**
     When view is clicked on, we become first responder again if we are not already
    */
    mouseDown: function(e) {
      sc_super();
      //console.log('Click detected');
      if (!this.get('isFirstResponder')) { 
        this.becomeFirstResponder();
      }
    },

    /**
     Call when we will become key responder, a.k.a. focus!
    */        
    //willBecomeKeyResponderFrom: function(responder) {
      //console.log('will become key responder');
    //  sc_super();
    //  this.set('_isFocused', YES);
    //},

    /**
     Call when we will lose key responder, a.k.a. losing focus 
    */
    //willLoseKeyResponderTo: function(responder) {
      //sc_super();
      //console.log('losing key responder')

      // Due to InlineTextFieldView behavior, we need the _isFocused to prevent
      // infinite loop in resigning as first responder
      /*
      if (this.get('_isFocused') && this.get('isFirstResponder')) {
        console.log('resigning first responder when losing key responder');
        var pane = this.get('pane');
        this.set('_isFocused', NO);    
        
        if (pane && this._previousFirstResponder) {
          pane.makeFirstResponder(this._previousFirstResponder);
        } 
        else {
          this.resignFirstResponder();
        }
      }
    */
    //},

    /**
     Overrides InlineTextFieldView 'enter' key press behavior to default
    */
    insertNewline: function(evt) {
      evt.allowDefault();
      return YES;         
    },
            
    /**
     Overrides InlineTextFieldView 'tab' key press behavior to back to one similar
     to text view to allow tab navigation across different field views.
    */
    insertTab: function(evt) {

      var view = evt.shiftKey ? this._delegate.get('previousValidKeyView') : this._delegate.get('nextValidKeyView');
      if (view) view.becomeFirstResponder();
      return YES ;
    }
  })
}); 
