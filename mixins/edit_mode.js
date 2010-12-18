/**
  Handles propagation of a property inEditMode to all child views.
*/
SandBox.FormsEditMode = {
  
  /**
    Walks like a duck.
  */
  //hasEditMode: YES,
  isEditable: YES,
  
  /**
    Whether we are in edit mode.
  */
  isEditing: NO,
  
  /**
    Handles changes to edit state. Alerts children.
  */
  //editModeDidChange: function(){
  //  this._propagateEditMode();    
  //}.observes("isEditing"),
  
  /**
    Ensures that edit mode is passed to all children.
  */
  //_scfem_childViewsDidChange: function() {
  //  this._propagateEditMode();
  //}.observes("childViews"),
  
  /**
    Propagates edit mode.
  */
  //_propagateEditMode: function() {
  //  var isEditing = this.get("isEditing");
  //  var cv = this.get("childViews"), idx, len = cv.length, v;
  //  for (idx = 0; idx < len; idx++) {
  //    v = cv[idx];
  //    if (SC.typeOf(v) === SC.T_STRING || v.isClass) return;
  //    if (v.get("hasEditMode")) v.set("isEditing", isEditing);
  //    if (v.get("isEditable")) v.
  //  }
  //}

  /**
   Propagate begins editing. Does NOT become first responder or anything; just changes editing state.
  */
  beginEditing: function() {
    if (this.get("isEditing")) return YES;

    // relay to all childviews that are editable...
    var cv = this.get("childViews"),
    len = cv.length,
    v, idx;

    for (idx = 0; idx < len; idx++) {
      v = cv[idx];
      if (v.get("isEditable")) v.beginEditing(); 
    }
    
    this.set("isEditing", YES);
    return YES;
  },

  /**
   Propagate commit editing changes.
  */
  commitEditing: function() { 
    if (!this.get("isEditing")) return YES;
 
    // relay to all childviews that are editable...
    var cv = this.get("childViews"),
    len = cv.length,
    v, idx;

    for (idx = 0; idx < len; idx++) {
      v = cv[idx];
      if (v.get("isEditable")) v.commitEditing(); 
    }
  
    this.set("isEditing", NO);
    return YES;
  },

  /**
   Propagate discard editing changes.
  */
  discardEditing: function() { 
    if (!this.get("isEditing")) return YES;
 
    // relay to all childviews that are editable...
    var cv = this.get("childViews"),
    len = cv.length,
    v, idx;

    for (idx = 0; idx < len; idx++) {
      v = cv[idx];
      if (v.get("isEditable")) v.discardEditing(); 
    }
  
    this.set("isEditing", NO);
    return YES;
  }


  
};
