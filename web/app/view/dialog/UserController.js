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

Ext.define('Trackmont.view.dialog.UserController', {
    extend: 'Trackmont.view.dialog.MapPickerController',
    alias: 'controller.user',

    init: function () {
        if (Trackmont.app.getUser().get('admin')) {
            this.lookupReference('adminField').setDisabled(false);
            this.lookupReference('deviceLimitField').setDisabled(false);
            this.lookupReference('userLimitField').setDisabled(false);
        }
        if (Trackmont.app.getUser().get('admin') || !this.getView().selfEdit) {
            this.lookupReference('readonlyField').setDisabled(false);
            this.lookupReference('disabledField').setDisabled(false);
            this.lookupReference('expirationTimeField').setDisabled(false);
            this.lookupReference('deviceReadonlyField').setDisabled(false);
        }
    },

    symbols: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',

    generateToken: function () {
        var i, newToken = '';

        for (i = 0; i < 32; i++) {
            newToken += this.symbols.charAt(Math.floor(Math.random() * this.symbols.length));
        }

        this.lookupReference('tokenField').setValue(newToken);
    },

    testNotification: function () {
        Ext.Ajax.request({
            url: 'api/users/notifications/test',
            method: 'POST',
            failure: function (response) {
                Trackmont.app.showError(response);
            }
        });
    },

    onSaveClick: function (button) {
        var dialog, record, store;
        dialog = button.up('window').down('form');
        dialog.updateRecord();
        record = dialog.getRecord();
        if (record === Trackmont.app.getUser()) {
            record.save();
        } else {
            store = Ext.getStore('Users');
            if (record.phantom) {
                store.add(record);
            }
            store.sync({
                failure: function (batch) {
                    store.rejectChanges();
                    Trackmont.app.showError(batch.exceptions[0].getError().response);
                }
            });
        }
        button.up('window').close();
    }
});