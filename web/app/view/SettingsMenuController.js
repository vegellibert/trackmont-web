/*
 * Copyright 2015 - 2017 Vicente Venegas  (vicente@republik.ec)
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

Ext.define('Trackmont.view.SettingsMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.settings',

    requires: [
        'Trackmont.view.dialog.LoginController',
        'Trackmont.view.dialog.User',
        'Trackmont.view.dialog.Server',
        'Trackmont.view.edit.Users',
        'Trackmont.view.edit.Groups',
        'Trackmont.view.edit.Geofences',
        'Trackmont.view.edit.Drivers',
        'Trackmont.view.Notifications',
        'Trackmont.view.edit.AttributeAliases',
        'Trackmont.view.edit.ComputedAttributes',
        'Trackmont.view.Statistics',
        'Trackmont.view.dialog.DeviceDistance',
        'Trackmont.view.edit.Calendars',
        'Trackmont.view.BaseWindow'
    ],

    init: function () {
        var admin, manager, readonly, deviceReadonly;
        admin = Trackmont.app.getUser().get('admin');
        manager = Trackmont.app.getUser().get('userLimit') !== 0;
        readonly = Trackmont.app.getPreference('readonly', false);
        deviceReadonly = Trackmont.app.getUser().get('deviceReadonly');
        if (admin) {
            this.lookupReference('settingsServerButton').setHidden(false);
            this.lookupReference('settingsStatisticsButton').setHidden(false);
            this.lookupReference('settingsDeviceDistanceButton').setHidden(Trackmont.app.getVehicleFeaturesDisabled());
        }
        if (admin || manager) {
            this.lookupReference('settingsUsersButton').setHidden(false);
        }
        if (admin || !readonly) {
            this.lookupReference('settingsUserButton').setHidden(false);
            this.lookupReference('settingsGroupsButton').setHidden(false);
            this.lookupReference('settingsGeofencesButton').setHidden(false);
            this.lookupReference('settingsNotificationsButton').setHidden(false);
            this.lookupReference('settingsCalendarsButton').setHidden(
                Trackmont.app.getBooleanAttributePreference('ui.disableCalendars'));
            this.lookupReference('settingsDriversButton').setHidden(
                Trackmont.app.getVehicleFeaturesDisabled() || Trackmont.app.getBooleanAttributePreference('ui.disableDrivers'));
        }
        if (admin || !deviceReadonly && !readonly) {
            this.lookupReference('settingsAttributeAliasesButton').setHidden(false);
            this.lookupReference('settingsComputedAttributesButton').setHidden(
                Trackmont.app.getBooleanAttributePreference('ui.disableComputedAttributes'));
        }
    },

    onUserClick: function () {
        var dialog = Ext.create('Trackmont.view.dialog.User', {
            selfEdit: true
        });
        dialog.down('form').loadRecord(Trackmont.app.getUser());
        dialog.lookupReference('testNotificationButton').setHidden(false);
        dialog.show();
    },

    onGroupsClick: function () {
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.settingsGroups,
            items: {
                xtype: 'groupsView'
            }
        }).show();
    },

    onGeofencesClick: function () {
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedGeofences,
            items: {
                xtype: 'geofencesView'
            }
        }).show();
    },

    onServerClick: function () {
        var dialog = Ext.create('Trackmont.view.dialog.Server');
        dialog.down('form').loadRecord(Trackmont.app.getServer());
        dialog.show();
    },

    onUsersClick: function () {
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.settingsUsers,
            items: {
                xtype: 'usersView'
            }
        }).show();
    },

    onNotificationsClick: function () {
        var user = Trackmont.app.getUser();
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedNotifications,
            items: {
                xtype: 'notificationsView',
                user: user
            }
        }).show();
    },

    onAttributeAliasesClick: function () {
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedAttributeAliases,
            items: {
                xtype: 'attributeAliasesView'
            }
        }).show();
    },

    onComputedAttributesClick: function () {
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedComputedAttributes,
            items: {
                xtype: 'computedAttributesView'
            }
        }).show();
    },

    onStatisticsClick: function () {
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.statisticsTitle,
            items: {
                xtype: 'statisticsView'
            }
        }).show();
    },

    onDeviceDistanceClick: function () {
        var dialog = Ext.create('Trackmont.view.dialog.DeviceDistance');
        dialog.show();
    },

    onCalendarsClick: function () {
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedCalendars,
            items: {
                xtype: 'calendarsView'
            }
        }).show();
    },

    onDriversClick: function () {
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedDrivers,
            items: {
                xtype: 'driversView'
            }
        }).show();
    },

    onLogoutClick: function () {
        Ext.create('Trackmont.view.dialog.LoginController').logout();
    }
});
