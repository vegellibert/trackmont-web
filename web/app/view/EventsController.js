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

Ext.define('Trackmont.view.EventsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.events',

    config: {
        listen: {
            controller: {
                '*': {
                    deselectevent: 'deselectEvent'
                }
            },
            store: {
                '#Events': {
                    add: 'onAddEvent'
                }
            }
        }
    },

    init: function () {
        var self = this;
        setInterval(function () {
            self.getView().getView().refresh();
        }, Trackmont.Style.refreshPeriod);

        if (Trackmont.app.isMobile()) {
            this.lookupReference('hideEventsButton').setHidden(false);
        }
    },

    onRemoveClick: function () {
        var event, positionId;
        event = this.getView().getSelectionModel().getSelection()[0];
        if (event) {
            Ext.getStore('Events').remove(event);
            positionId = event.get('positionId');
            if (positionId && !Ext.getStore('Events').findRecord('positionId', positionId, 0, false, false, true)) {
                Ext.getStore('EventPositions').remove(Ext.getStore('EventPositions').getById(positionId));
            }
        }
    },

    onClearClick: function () {
        Ext.getStore('Events').removeAll();
        Ext.getStore('EventPositions').removeAll();
    },

    onAddEvent: function () {
        if (this.lookupReference('scrollToLastButton').pressed) {
            this.getView().scrollBy(0, Number.POSITIVE_INFINITY, true);
        }
    },

    onScrollToLastClick: function (button, pressed) {
        if (pressed) {
            this.onAddEvent();
        }
    },

    onHideEvents: function () {
        Trackmont.app.showEvents(false);
    },

    deselectEvent: function () {
        this.getView().getSelectionModel().deselectAll();
    },

    onSelectionChange: function (selection, selected) {
        var event, positionId, position;
        event = selected.length > 0 ? selected[0] : null;
        if (event) {
            positionId = event.get('positionId');
            if (positionId) {
                position = Ext.getStore('EventPositions').getById(positionId);
                if (position) {
                    this.fireEvent('selectevent', position);
                } else {
                    Ext.getStore('EventPositions').load({
                        params: {
                            id: positionId
                        },
                        scope: this,
                        addRecords: true,
                        callback: function (records, operation, success) {
                            if (success && records.length > 0) {
                                this.fireEvent('selectevent', records[0]);
                            }
                        }
                    });
                }
            } else {
                this.fireEvent('selectevent');
            }
        }
        this.lookupReference('removeEventButton').setDisabled(!event);
    }
});
