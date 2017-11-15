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

Ext.define('Trackmont.view.dialog.BaseEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.baseEdit',

    requires: [
        'Trackmont.view.BaseWindow',
        'Trackmont.view.edit.Attributes'
    ],

    onSaveClick: function (button) {
        var dialog, store, record;
        dialog = button.up('window').down('form');
        dialog.updateRecord();
        record = dialog.getRecord();
        store = record.store;
        if (store) {
            if (record.phantom) {
                store.add(record);
            }
            store.sync({
                failure: function (batch) {
                    store.rejectChanges();
                    Trackmont.app.showError(batch.exceptions[0].getError().response);
                }
            });
        } else {
            record.save();
        }
        button.up('window').close();
    },

    showAttributesView: function (button) {
        var dialog, record;
        dialog = button.up('window').down('form');
        record = dialog.getRecord();
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedAttributes,
            items: {
                xtype: 'attributesView',
                record: record
            }
        }).show();
    }
});
