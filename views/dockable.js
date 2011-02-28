// ==========================================================================
// Project:   SandBox.DockableView
// Copyright: ©2010 Fidura, LLC.
// ==========================================================================
/*globals SalePoint */

/** @class

  @extends SC.View
*/

SandBox.DOCK_LEFT_WIDTH = 'dock-left-width';
SandBox.DOCK_LEFT_ABS = 'dock-left-absolute';
SandBox.DOCK_RIGHT_WIDTH = 'dock-right-width';
SandBox.DOCK_RIGHT_ABS = 'dock-right-absolute';
SandBox.DOCK_TOP_HEIGHT = 'dock-top-height';
SandBox.DOCK_TOP_ABS = 'dock-top-absolute';
SandBox.DOCK_BOTTOM_HEIGHT = 'dock-bottom-height';
SandBox.DOCK_BOTTOM_ABS = 'dock-bottom-absolute';

SandBox.DockableView = SC.View.extend(
/** @scope SandBox.SplitView.prototype */ {
  
  dockAmount: 400,
  isDocked: NO,
  dockBehavior: SandBox.DOCK_LEFT_WIDTH,


  createChildViews: function() {
    var childViews = [],
        view,
        isDocked = this.get('isDocked');

    // Create main view
    view = this.get('mainView');
    view = this.createChildView(view);
    this.set('mainView', view);
    childViews.push(view);

    // Create dock view
    view = this.get('dockView');
    view = this.createChildView(view);
    this.set('dockView', view);
    childViews.push(view);

    // Setup initial docking state
    this.setInitialUndockLayout();
    if (isDocked) this.dock(YES);
    else this.unDock(YES);
    
    this.set('childViews', childViews) ;
    return this ; 
  },
 

  setInitialUndockLayout: function() {
    var mainV = this.get('mainView'),
        dockV = this.get('dockView'),
        dockBehavior = this.get('dockBehavior');

    mainV.set('layout', { left: 0, right: 0, top: 0, bottom: 0 });

    console.log(dockBehavior);
    switch (dockBehavior) {
      case SandBox.DOCK_LEFT_WIDTH:
      case SandBox.DOCK_LEFT_ABS:
        dockV.set('layout', { left: 0, width: 0, top: 0, bottom: 0 });
        break;

      case SandBox.DOCK_RIGHT_WIDTH:
      case SandBox.DOCK_RIGHT_ABS:
        dockV.set('layout', { right: 0, width: 0, top: 0, bottom: 0 });
        break;

      case SandBox.DOCK_TOP_HEIGHT:
      case SandBox.DOCK_TOP_ABS:
        dockV.set('layout', { left: 0, right: 0, top: 0, height: 0 });
        break;

      case SandBox.DOCK_BOTTOM_HEIGHT:
      case SandBox.DOCK_BOTTOM_ABS:
        dockV.set('layout', { left: 0, right: 0, bottom: 0, height: 0 });
        break;

      default:
        throw 'Invalid dock behavior';
    }

    this.set('isDocked', NO);
  },


  dock: function(force) {
    if (this.get('isDocked') && !this.get('force')) return;

    var dockAmnt = this.get('dockAmount'),
        mainV = this.get('mainView'),
        dockV = this.get('dockView'),
        dockBehavior = this.get('dockBehavior');

    switch (dockBehavior) {
      case SandBox.DOCK_LEFT_WIDTH:
        mainV.adjust({ left: dockAmnt });
        dockV.adjust({ width: dockAmnt - 1 });
        break;

      case SandBox.DOCK_LEFT_ABS:
        mainV.adjust({ width: dockAmnt, left: null });
        dockV.adjust({ width: null, right: dockAmnt });
        break;

      case SandBox.DOCK_RIGHT_WIDTH:
        mainV.adjust({ right: dockAmnt });
        dockV.adjust({ width: dockAmnt - 1 });
        break
 
      case SandBox.DOCK_RIGHT_ABS:
        mainV.adjust({ width: dockAmnt, right: null });
        dockV.adjust({ width: null, left: dockAmnt - 1 });
        break;

      case SandBox.DOCK_TOP_HEIGHT:
        mainV.adjust({ top: dockAmnt });
        dockV.adjust({ height: dockAmnt });
        break;

      case SandBox.DOCK_TOP_ABS:
        mainV.adjust({ height: dockAmnt, top: null });
        dockV.adjust({ height: null, bottom: dockAmnt });
        break;

      case SandBox.DOCK_BOTTOM_HEIGHT:
        mainV.adjust({ bottom: dockAmnt });
        dockV.adjust({ height: dockAmnt });
        break;

      case SandBox.DOCK_BOTTOM_ABS:
        mainV.adjust({ height: dockAmnt, bottom: null });
        dockV.adjust({ height: null, top: dockAmnt });
        break;

      default:
        throw 'Invalid dock behavior';
    }

    this.set('isDocked', YES);
  },


  unDock: function(force) {
    if (!this.get('isDocked') && !this.get('force')) return;

    var mainV = this.get('mainView'),
        dockV = this.get('dockView'),
        dockBehavior = this.get('dockBehavior');

    switch (dockBehavior) {
      case SandBox.DOCK_LEFT_WIDTH:
      case SandBox.DOCK_LEFT_ABS:
        mainV.adjust({ width: null, left: 0 });
        dockV.adjust({ width: 0, right: null });
        break;

      case SandBox.DOCK_RIGHT_WIDTH:
      case SandBox.DOCK_RIGHT_ABS:
        mainV.adjust({ width: null, right: 0 });
        dockV.adjust({ width: 0, left: null });
        break;

      case SandBox.DOCK_TOP_HEIGHT:
      case SandBox.DOCK_TOP_ABS:
        mainV.adjust({ height: null, top: 0 });
        dockV.adjust({ height: 0, bottom: null });
        break;

      case SandBox.DOCK_BOTTOM_HEIGHT:
      case SandBox.DOCK_BOTTOM_ABS:
        mainV.adjust({ height: null, bottom: 0 });
        dockV.adjust({ height: 0, top: null });
        break;

      default:
        throw 'Invalid dock behavior';
    }

    this.set('isDocked', NO);
  }

}); 
