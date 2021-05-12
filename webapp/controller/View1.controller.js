sap.ui.define(
     ['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/ui/core/Fragment',],
     function (Controller, JSONModel, Fragment) {
          'use strict';

          return Controller.extend(
               'com.Innovation.ui5Project.controller.View1',
               {
                    onNavBack: function(){
                         return this.oRouter.navTo('TargetView2');
                    },
                    onInit: function () {
                         this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                         this.oRouter.getTarget("TargetView1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
                    },
                    handleRouteMatched: function() {},
                    onListPlanningCalendarDrop: function (oEvent) {
                         var oDroppedControl =
                              oEvent.getParameter('droppedControl');
                         var oDragSession = oEvent.getParameter('dragSession');
                         var cliId = oDroppedControl.getId();
                         var rowId = cliId.replace('-CLI', '');
                         var pcRow = sap.ui.getCore().byId(rowId);
                         var oBindingContext =
                              pcRow.getBindingContext('calendarModel');
                         var resourceObj = oBindingContext.getObject();
                         var oDraggedRowContext =
                              oDragSession.getComplexData('onListDragContext');
                         
                    },

                    onListPlanningCalendardragStart: function (oEvent) {
                         var oDragSession = oEvent.getParameter('dragSession');
                         var oDraggedRow = oEvent.getParameter('target');
                         var oContextBinding = oDraggedRow
                              .getBindingContext('listModel')
                              .getObject();
                         oDragSession.setComplexData(
                              'onListDragContext',
                              oDraggedRow
                         );
                        
                    },
                    handleAppointmentSelect: function (oEvent) {
                         var oAppointment = oEvent.getParameter("appointment");
     
                         if (oAppointment) {
                              this._handleSingleAppointment(oAppointment);
                         } else {
                              this._handleGroupAppointments(oEvent);
                         }
                    },
                    _handleSingleAppointment: function (oAppointment) {
                         var oView = this.getView();
                         if (oAppointment === undefined) {
                              return;
                         }
     
                         if (!oAppointment.getSelected() && this._pDetailsPopover) {
                              this._pDetailsPopover.then(function(oDetailsPopover){
                                   oDetailsPopover.close();
                              });
                              return;
                         }
     
                         if (!this._pDetailsPopover) {
                              this._pDetailsPopover = Fragment.load({
                                   id: oView.getId(),
                                   name: "com.Innovation.ui5Project.view.Details",
                                   controller: this
                              }).then(function(oDetailsPopover){
                                   oView.addDependent(oDetailsPopover);
                                   return oDetailsPopover;
                              });
                         }
                         var self = this;
     
                         this._pDetailsPopover.then(function(oDetailsPopover){
                              self._setDetailsDialogContent(oAppointment, oDetailsPopover);
                         }.bind(this));
                    },
                    _setDetailsDialogContent: function(oAppointment, oDetailsPopover){
                         oDetailsPopover.setBindingContext(oAppointment.getBindingContext('calendarModel'));
                         
                         console.log(oAppointment.getBindingContext('calendarModel').getObject())
                         var j = new JSONModel(oAppointment.getBindingContext('calendarModel').getObject())
                         this.getView().setModel(j, 'detailModel')
                         oDetailsPopover.openBy(oAppointment);
                    },
                    _handleGroupAppointments: function (oEvent) {
                         var aAppointments,
                              sGroupAppointmentType,
                              sGroupPopoverValue,
                              sGroupAppDomRefId,
                              bTypeDiffer;
     
                         aAppointments = oEvent.getParameter("appointments");
                         sGroupAppointmentType = aAppointments[0].getType();
                         sGroupAppDomRefId = oEvent.getParameter("domRefId");
                         bTypeDiffer = aAppointments.some(function (oAppointment) {
                              return sGroupAppointmentType !== oAppointment.getType();
                         });
     
                         if (bTypeDiffer) {
                              sGroupPopoverValue = aAppointments.length + " Appointments of different types selected";
                         } else {
                              sGroupPopoverValue = aAppointments.length + " Appointments of the same " + sGroupAppointmentType + " selected";
                         }
     
                         if (!this._oGroupPopover) {
                              this._oGroupPopover = new Popover({
                                   title: "Group Appointments",
                                   content: new Label({
                                        text: sGroupPopoverValue
                                   })
                              });
                         } else {
                              this._oGroupPopover.getContent()[0].setText(sGroupPopoverValue);
                         }
                         this._oGroupPopover.addStyleClass("sapUiContentPadding");
                         this._oGroupPopover.openBy(document.getElementById(sGroupAppDomRefId));
                    },
                    handleEditButton: function(){
                         var oDetailsPopover = this.byId("detailsPopover");
                         this.sPath = oDetailsPopover.getBindingContext().getPath();
                         oDetailsPopover.close();
                         this._arrangeDialogFragment(this._aDialogTypes[2].type);
     
                    },
                    handleDeleteAppointment: function(){
                         var oDetailsPopover = this.byId("detailsPopover"),
                              oBindingContext = oDetailsPopover.getBindingContext(),
                              oAppointment = oBindingContext.getObject(),
                              iPersonIdStartIndex = oBindingContext.getPath().indexOf("/people/") + "/people/".length,
                              iPersonId = oBindingContext.getPath()[iPersonIdStartIndex];
     
                         // this._removeAppointment(oAppointment, iPersonId);
                         oDetailsPopover.close();
                    },
                    _aDialogTypes: [
                         { title: "Create Appointment", type: "create_appointment" },
                         { title: "Create Appointment", type: "create_appointment_with_context"},
                         { title: "Edit Appointment", type: "edit_appointment" }
                    ],
                    _arrangeDialogFragment: function (iDialogType) {
                         var oView = this.getView();
     
                         if (!this._pNewAppointmentDialog) {
                              this._pNewAppointmentDialog = Fragment.load({
                                   id: oView.getId(),
                                   name: "com.Innovation.ui5Project.view.Create",
                                   controller: this
                              }).then(function(oDialog) {
                                   oView.addDependent(oDialog);
                                   return oDialog;
                              });
                         }
                         var self = this;
                         this._pNewAppointmentDialog.then(function(oDialog) {
                              self._arrangeDialog(iDialogType, oDialog);
                         }.bind(this));
                    },
                    _arrangeDialog: function(sDialogType, oDialog) {
                         var sTempTitle = "";
                         oDialog._sDialogType = sDialogType;
                         if (sDialogType === "edit_appointment"){
                              this._setEditAppointmentDialogContent(oDialog);
                              sTempTitle = this._aDialogTypes[2].title;
                         } else if (sDialogType === "create_appointment_with_context"){
                              this._setCreateWithContextAppointmentDialogContent();
                              sTempTitle = this._aDialogTypes[1].title;
                         } else if (sDialogType === "create_appointment"){
                              this._setCreateAppointmentDialogContent();
                              sTempTitle = this._aDialogTypes[0].title;
                         } else {
                              Log.error("Wrong dialog type.");
                         }
     
                         this.updateButtonEnabledState(oDialog);
                         oDialog.setTitle(sTempTitle);
                         oDialog.open();
                    },
                    updateButtonEnabledState: function (oDialog) {
                         var oStartDate = this.byId("startDate"),
                              oEndDate = this.byId("endDate"),
                              bEnabled = oStartDate.getValueState() !== sap.ui.core.ValueState.Error
                              && oStartDate.getValue() !== ""
                              && oEndDate.getValue() !== ""
                              && oEndDate.getValueState() !== sap.ui.core.ValueState.Error;
     
                              oDialog.getBeginButton().setEnabled(bEnabled);
                    },

                    _setEditAppointmentDialogContent: function(oDialog){
                         var oAppointment = oDialog.getModel('calendarModel').getProperty(this.sPath),
                              oSelectedIntervalStart = oAppointment.start,
                              oSelectedIntervalEnd = oAppointment.end,
                              oDateTimePickerStart = this.byId("startDate"),
                              oDateTimePickerEnd = this.byId("endDate"),
                              sSelectedInfo = oAppointment.info,
                              sSelectedTitle = oAppointment.title,
                              iSelectedPersonId = this.sPath[this.sPath.indexOf("/people/") + "/people/".length],
                              oPersonSelected = this.byId("selectPerson"),
                              oStartDate = this.byId("startDate"),
                              oEndDate = this.byId("endDate"),
                              oMoreInfoInput = this.byId("moreInfo"),
                              oTitleInput = this.byId("inputTitle"),
                              oAppointmentType = this.byId("isIntervalAppointment");

                         oPersonSelected.setSelectedIndex(iSelectedPersonId);

                         oStartDate.setDateValue(oSelectedIntervalStart);

                         oEndDate.setDateValue(oSelectedIntervalEnd);

                         oMoreInfoInput.setValue(sSelectedInfo);

                         oTitleInput.setValue(sSelectedTitle);

                         oDateTimePickerStart.setValueState(sap.ui.core.ValueState.None);
                         oDateTimePickerEnd.setValueState(sap.ui.core.ValueState.None);

                         oAppointmentType.setSelected(false);
                    },   
                    formatDate: function (oDate) {
                         if (oDate) {
                              var iHours = oDate.getHours(),
                                   iMinutes = oDate.getMinutes(),
                                   iSeconds = oDate.getSeconds();
     
                              if (iHours !== 0 || iMinutes !== 0 || iSeconds !== 0) {
                                   return sap.ui.core.format.DateFormat.getDateTimeInstance({ style: "medium" }).format(oDate);
                              } else  {
                                   return sap.ui.core.format.DateFormat.getDateInstance({ style: "medium" }).format(oDate);
                              }
                         }
                    },
               },
               
          );
     }
);
