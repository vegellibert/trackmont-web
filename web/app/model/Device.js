/*
 * Copyright 2015 Vicente Venegas  (vicente@republik.ec)
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

Ext.define('Trackmont.model.Device', {
    extend: 'Ext.data.Model',
    identifier: 'negative',

    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'uniqueId',
        type: 'string'
    }, {
        name: 'phone',
        type: 'string',
        allowNull: true
    }, {
        name: 'model',
        type: 'string',
        allowNull: true
    }, {
        name: 'contact',
        type: 'string',
        allowNull: true
    }, {
        name: 'category',
        type: 'string',
        allowNull: true
    }, {
        name: 'status',
        type: 'string',
        allowNull: true
    }, {
        name: 'lastUpdate',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'groupId',
        type: 'int'
    }, {
        name: 'geofenceIds'
    }, {
        name: 'attributes'
    }]
});
