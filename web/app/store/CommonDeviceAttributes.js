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
Ext.define('Trackmont.store.CommonDeviceAttributes', {
    extend: 'Ext.data.Store',
    model: 'Trackmont.model.KnownAttribute',

    data: [{
        key: 'speedLimit',
        name: Strings.attributeSpeedLimit,
        valueType: 'number',
        dataType: 'speed'
    }, {
        key: 'report.ignoreOdometer',
        name: Strings.attributeReportIgnoreOdometer,
        valueType: 'boolean'
    }, {
        key: 'maintenance.start',
        name: Strings.attributeMaintenanceStart,
        valueType: 'number',
        dataType: 'distance'
    }, {
        key: 'maintenance.interval',
        name: Strings.attributeMaintenanceInterval,
        valueType: 'number',
        dataType: 'distance'
    }]
});
