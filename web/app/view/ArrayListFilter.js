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

Ext.define('Trackmont.view.ArrayListFilter', {
    extend: 'Ext.grid.filters.filter.List',
    alias: 'grid.filter.arraylist',

    type: 'arraylist',

    constructor: function (config) {
        this.callParent([config]);
        this.filter.setFilterFn(function (item) {
            var i, property, value;
            property = item.get(this.getProperty());
            value = this.getValue();
            if (Ext.isArray(property)) {
                for (i = 0; i < property.length; i++) {
                    if (value.indexOf(property[i]) !== -1) {
                        return true;
                    }
                }
            } else if (value.indexOf(property) !== -1) {
                return true;
            }
            return false;
        });
    }
});
