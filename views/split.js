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
/** @scope SandBox.SplitView.prototype */ 

{

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


/*
{  
  collapseTopLeftView: function(yn) {
    if (yn) {
      return this.collapseView(this._topLeftView);
    } else {
      return this.uncollapseView(this._topLeftView);
    }
  },
  
  collapseBottomRightView: function(yn) {
    if (yn) {
      return this.collapseView(this._bottomRightView);
    } else {
      return this.uncollapseView(this._bottomRightView);
    }
  },

  collapseView: function(view) {
    if (view !== this._topLeftView && view !== this._bottomRightView) {
      return NO;
    }
    
    this._cacheCurrentDimensions();
    
    var isCollapsed = view.get('isCollapsed') || NO ;
    
    if (!isCollapsed && this.canCollapseView(view)) {
      // remember thickness in it's uncollapsed state
      this._uncollapsedThickness = this.thicknessForView(view)  ;
      this._uncollapsedDividerThickness = this.get('dividerThickness');
      
      if (view === this._topLeftView) {
        this._updateTopLeftThickness(this.topLeftThickness()*-1) ;
      } else {
        this._updateBottomRightThickness(this.bottomRightThickness()*-1) ;
      }
      
      // if however the splitview decided not to collapse, clear:
      if (!view.get("isCollapsed")) {
        this._uncollapsedThickness = null;
        return NO;
      }
      
      this.set('dividerThickness', 0);
      this.updateChildLayout();
      return YES;
    } 
    
    return NO;
  },
  
  uncollapseView: function(view) {
    if (view !== this._topLeftView && view !== this._bottomRightView) {
      return NO;
    }
    
    var isCollapsed = view.get('isCollapsed') || NO ;

    if (isCollapsed) {
      this.set('dividerThickness', (this._uncollapsedDividerThickness || 7));
      this._cacheCurrentDimensions();
      // uncollapse to the last thickness in it's uncollapsed state
      if (view === this._topLeftView) {
        this._updateTopLeftThickness(this._uncollapsedThickness) ;
      } else {
        this._updateBottomRightThickness(this._uncollapsedThickness) ;
      }
      view._uncollapsedThickness = null ;
      
      this.updateChildLayout();
    }
    
    return true;
  },
  
  _cacheCurrentDimensions: function() {
    this._topLeftView = this.get('topLeftView') ;
    this._bottomRightView = this.get('bottomRightView') ;
    this._topLeftViewThickness = this.thicknessForView(this.get('topLeftView'));
    this._bottomRightThickness = this.thicknessForView(this.get('bottomRightView'));
    this._dividerThickness = this.get('dividerThickness') ;
    this._layoutDirection = this.get('layoutDirection') ;
  },
  
});
*/
