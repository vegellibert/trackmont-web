/*
 * Copyright 2016 - 2017 Vicente Venegas  (vicente@republik.ec)
 * Copyright 2016 - 2017 Andrey Kunitsyn (andrey@trackmont.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Trackmont.view.edit.AttributeAliasesController', {
    extend: 'Trackmont.view.edit.ToolbarController',
    alias: 'controller.attributeAliases',

    requires: [
        'Trackmont.view.dialog.AttributeAlias',
        'Trackmont.model.AttributeAlias'
    ],

    objectModel: 'Trackmont.model.AttributeAlias',
    objectDialog: 'Trackmont.view.dialog.AttributeAlias',
    removeTitle: Strings.sharedAttributeAlias,

    init: function () {
        var manager = Trackmont.app.getUser().get('admin') || Trackmont.app.getUser().get('userLimit') > 0;
        this.lookupReference('deviceField').setStore(manager ? 'AllDevices' : 'Devices');
        this.lookupReference('toolbarAddButton').setDisabled(true);
        this.lookupReference('toolbarEditButton').setDisabled(true);
        this.lookupReference('toolbarRemoveButton').setDisabled(true);
        this.getView().setStore(Ext.create('Ext.data.ChainedStore', {
            storeId: 'EditorAttributeAliases',
            source: 'AttributeAliases'
        }));
        this.getView().getStore().filter('deviceId', 0);
    },

    onAddClick: function () {
        var attributeAlias, dialog, deviceId;
        attributeAlias = Ext.create('Trackmont.model.AttributeAlias');
        attributeAlias.store = Ext.getStore('AttributeAliases');
        deviceId = this.lookupReference('deviceField').getValue();
        attributeAlias.set('deviceId', deviceId);
        dialog = Ext.create('Trackmont.view.dialog.AttributeAlias');
        dialog.down('form').loadRecord(attributeAlias);
        dialog.show();
    },

    onSelectionChange: function (selection, selected) {
        var disabled = !this.lookupReference('deviceField').getValue();
        this.lookupReference('toolbarAddButton').setDisabled(disabled);
        disabled = !selected || selected.length === 0 || !this.lookupReference('deviceField').getValue();
        this.lookupReference('toolbarEditButton').setDisabled(disabled);
        this.lookupReference('toolbarRemoveButton').setDisabled(disabled);
    },

    onDeviceChange: function (combobox, value) {
        var manager = Trackmont.app.getUser().get('admin') || Trackmont.app.getUser().get('userLimit') > 0;
        this.onSelectionChange();
        if (value !== null) {
            this.getView().getStore().filter('deviceId', value);
            if (manager && this.getView().getStore().getCount() === 0) {
                Ext.getStore('AttributeAliases').getProxy().setExtraParam('deviceId', value);
                Ext.getStore('AttributeAliases').load({
                    addRecords: true
                });
            }
        } else {
            this.getView().getStore().filter('deviceId', 0);
        }
    }
});
