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

Ext.define('Trackmont.view.BaseWindow', {
    extend: 'Ext.window.Window',

    width: Trackmont.Style.windowWidth,
    height: Trackmont.Style.windowHeight,
    layout: 'fit',

    initComponent: function () {
        if (window.innerWidth < Trackmont.Style.windowWidth || window.innerHeight < Trackmont.Style.windowHeight) {
            this.maximized = true;
            this.style = 'border-width: 0';
        }
        this.callParent();
    }
});
