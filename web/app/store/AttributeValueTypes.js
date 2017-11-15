/*
 * Copyright 2017 Vicente Venegas  (vicente@republik.ec)
 * Copyright 2017 Andrey Kunitsyn (andrey@trackmont.com)
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
Ext.define('Trackmont.store.AttributeValueTypes', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name'],
    proxy: 'memory',

    data: [{
        id: 'string',
        name: Strings.sharedTypeString
    }, {
        id: 'number',
        name: Strings.sharedTypeNumber
    }, {
        id: 'boolean',
        name: Strings.sharedTypeBoolean
    }]
});
