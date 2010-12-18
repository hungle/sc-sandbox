// ==========================================================================
// Project:   SandBox.FormFieldView
// Copyright: ©2009 Alex Iskander and TPSi
// ==========================================================================
/*globals Forms */

/** @class
	Encapsulates a field. 
	
	The default implementation takes the fieldClass property and creates
	an instance.
	
	h2. Special Features of FormFieldView
	FormFieldView addresses a few primary things:
	
	- <strong>Beginning/ending editing</strong>. This allows the fields to
	automatically enter and exit editing mode when the form does. FieldView
	specializations don't really have to do much special here (though they can
	if they want)—the default handling of this is to hide and show the label and
	field. The functions hideField, hideLabel, showField, and showLabel handle this,
	and can be overriden for purposes such as animation.
	
	- <strong>Automatic resizing</strong>. The FormFieldView is <em>always</em> sized
	to the size of its active child (either field or label). When autoResize is enabled,
	if the field and label support it, the FormFieldView will therefore automatically
	support it as well, shrinking and growing as necessary.
	@extends SC.View
*/

SandBox.FormFieldView = SC.View.extend(SC.Editable, SC.Control,
/** @scope SandBox.FormFieldView.prototype */ {

  layout: { minWidth: 200, height: 18 },

  isEditable: YES,

	/**
		The currently active item (label or field)
	*/
	activeView: null,
	

	/**
		The field that was automatically created.
	*/
	editView: null,
	

	/**
		The display view to show when not editing
	*/
	displayView: SC.LabelView.extend(SC.AutoResize, {
	  layout: { left: 0, top: 0, width: 0, height: 18 },

	  //shouldAutoResize: NO, // only change the measuredSize so we can update.
	  //fillHeight: YES,
	}),


	/**
		Controls the initialization of the field and label.
	*/

  createChildViews: function() {
		//sc_super();
		
		//this.setupDisplayView();
		//this.setupEditView();
		
    var v;
    var cv = [];

    this.beginPropertyChanges();

    console.log('setting up display view');
    // Setup the display view 
    v = this.createChildView(this.get('displayView'));
    v.bind('value', this, 'value');
    this.set('displayView', v);
    this.set('activeView', v);
    cv.push(v);

    console.log('setting up edit view');
    // Setup the edit view
		v = this.createChildView(this.get('editView'));
	  this.set('editView', v);	
    cv.push(v);	

    this.updateEditingState();
    this.set('childViews', cv);

    console.log('done setting up views');

    this.endPropertyChanges();
    return this;
	},

	/**
		Updates the size when the size of the contained object (the field or label)
		changes.
	*/
	layoutDidChangeFor: function(child) {
		sc_super();

    console.log('layout did change for child view');
		if (SC.compare(child, this.get('activeView')) === 0) {
      this.invokeOnce(this._updateToActiveLayout);
		}
	},
	
	/**
		Called when the active view (field or label) changes 
	*/
  activeViewDidChange: function() {
    console.log('active view did change');                     
    this.invokeOnce(this._updateToActiveLayout);
  }.observes('activeView'),


	_updateToActiveLayout: function() {
    console.log('update to active layout');
		var active = this.get('activeView');
		if (!active) return;
		
		this.adjust({
			width: active.get('layout').width,
			height: active.get('layout').height
		});
	},
	
	
	/**
	Does not do precisely what you expect :).
	
	What does it do? It begins editing, but does not take first responder status,
	because this field is not supposed to take views. This is just state-related stuff.
	If the field this contains wants to take focus, fine for it!
	*/

	beginEditing: function() {
		if (this.get('isEditing')) return YES;
  
    console.log('begin editing form field');
    // Make the edit view active
    var v = this.get('editView');
    this.set('activeView', v);

    // TBD, what if value is an object? It will be passed as reference, not what we want!!
    // Sync the display view value to the edit view
    v.set('value', this.get('value'));

		this.set("isEditing", YES);
    return YES;
  },
	

	discardEditing: function() {
    return this._endEditing(this.get('value'));
	},


	commitEditing: function() {
    return this._endEditing(this.get('editView').get('value'));
	},


  _endEditing: function(finalValue) {
    if (!this.get('isEditing')) return YES;
 
    // Make the display view active
    var v = this.get('displayView');
		this.set('activeView', v);

    // TBD, what if value is an object?
    // Sync the value
    this.set('value', finalValue);
    
    this.set('isEditing', NO);
    return YES;
  },


	isEditingDidChange: function() {
		this.updateEditingState();
	}.observes("isEditing"),
	

	updateEditingState: function() {
		var editing = this.get("isEditing");
		this.get("editView").set("isVisible", editing);
		this.get("displayView").set("isVisible", !editing);
	}

});
