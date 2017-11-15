/*
 * Copyright 2016 - 2017 Vicente Venegas  (vicente@republik.ec)
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

Ext.define('Trackmont.view.edit.GroupsController', {
    extend: 'Trackmont.view.edit.ToolbarController',
    alias: 'controller.groups',

    requires: [
        'Trackmont.view.dialog.Group',
        'Trackmont.view.permissions.GroupGeofences',
        'Trackmont.view.permissions.GroupAttributes',
        'Trackmont.view.permissions.GroupDrivers',
        'Trackmont.view.BaseWindow',
        'Trackmont.model.Group'
    ],

    objectModel: 'Trackmont.model.Group',
    objectDialog: 'Trackmont.view.dialog.Group',
    removeTitle: Strings.groupDialog,

    init: function () {
        this.lookupReference('toolbarDriversButton').setHidden(
            Trackmont.app.getVehicleFeaturesDisabled() || Trackmont.app.getBooleanAttributePreference('ui.disableDrivers'));
        this.lookupReference('toolbarAttributesButton').setHidden(
            Trackmont.app.getBooleanAttributePreference('ui.disableComputedAttributes'));
    },

    onGeofencesClick: function () {
        var admin, group;
        admin = Trackmont.app.getUser().get('admin');
        group = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedGeofences,
            items: {
                xtype: 'groupGeofencesView',
                baseObjectName: 'groupId',
                linkObjectName: 'geofenceId',
                storeName: admin ? 'AllGeofences' : 'Geofences',
                baseObject: group.getId()
            }
        }).show();
    },

    onAttributesClick: function () {
        var admin, group;
        admin = Trackmont.app.getUser().get('admin');
        group = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedComputedAttributes,
            items: {
                xtype: 'groupAttributesView',
                baseObjectName: 'groupId',
                linkObjectName: 'attributeId',
                storeName: admin ? 'AllComputedAttributes' : 'ComputedAttributes',
                baseObject: group.getId()
            }
        }).show();
    },

    onDriversClick: function () {
        var admin, group;
        admin = Trackmont.app.getUser().get('admin');
        group = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedDrivers,
            items: {
                xtype: 'groupDriversView',
                baseObjectName: 'groupId',
                linkObjectName: 'driverId',
                storeName: admin ? 'AllDrivers' : 'Drivers',
                baseObject: group.getId()
            }
        }).show();
    },

    onSelectionChange: function (selection, selected) {
        var disabled = selected.length === 0;
        this.lookupReference('toolbarGeofencesButton').setDisabled(disabled);
        this.lookupReference('toolbarAttributesButton').setDisabled(disabled);
        this.lookupReference('toolbarDriversButton').setDisabled(disabled);
        this.callParent(arguments);
    }
});
