const { contextBridge } = require('electron');
const Sortable = require('sortablejs');

// Safely injects Sortable into the global window context of your app
contextBridge.exposeInMainWorld('ElectronModules', {
    initSortable: (element, options) => {
        if (Sortable && element) {
            return new Sortable(element, options);
        }
    }
});
