// ==========================================================================
// Project:   SandBox.SplitView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SalePoint */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SandBox.SplitView = SC.SplitView.extend(
/** @scope SandBox.SplitView.prototype */ {

  collapseBottomRight: function() {
    console.log('attempt to collapse');
    var view = this._bottomRightView;
    var isCollapsed = NO;

    if (!view) return;
    else isCollapsed = view.get('isCollapsed');

    // Can the view be collapsed?
    if (!this.canCollapseView(view)) {
      console.log('cant collapse');
      return NO;
    }
    
    // Not currently collapsed so try it
    if (!isCollapsed) {
      console.log('collapsed');
      // remember thickness in it's uncollapsed state
      this._uncollapsedThickness = this.thicknessForView(view)  ;
      // and collapse by increasing top/left view thickness
      this._updateTopLeftThickness(this.bottomRightThickness()) ;
      
      // if however the splitview decided not to collapse, clear:
      if (!view.get("isCollapsed")) {
        this._uncollapsedThickness = null;
      }
    } 

    return YES;
  },

  uncollapseBottomRight: function() {
    var view = this._bottomRightView,
        isCollapsed = view.get('isCollapsed') || NO;

    // If the view is not currently collapsed, do nothing
    if (!isCollapsed) {
      return YES;
    }
    
    console.log('uncollapsed');
    // uncollapse to the last thickness in it's uncollapsed state, otherwise, calc
    // default
    if (!this._uncollapsedThickness) {
      this._uncollapsedThickness = this._topLeftViewThickness - this.get('defaultThickness');
    }

    this._updateTopLeftThickness(this._uncollapsedThickness * -1) ;
    this._uncollapsedThickness = null ;

    return YES;
  }

}); 
