sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/Innovation/ui5Project/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.Innovation.ui5Project.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			 
			 
			var products = [
				{
					"Title": "Cod. Impianto:",
					"TitleText": "30001234",
					"SubTitle": "Cod. Cliente:",
					"SubTitleText": "10000432",
					"Description": "Data:",
					"DescriptionText": "27/03/2020",
					"highlight": "Success",
					"Info": 'OdS: 20000234'
				},
				{
					"Title": "Cod. Impianto:",
					"TitleText": "30001234",
					"SubTitle": "Cod. Cliente:",
					"SubTitleText": "10000432",
					"Description": "Data:",
					"DescriptionText": "28/03/2020",
					"highlight": "Error",
					"Info": 'OdS: 20000234'
				},
				{
					"Title": "Cod. Impianto:",
					"TitleText": "30001234",
					"SubTitle": "Cod. Cliente:",
					"SubTitleText": "10000432",
					"Description": "Data:",
					"DescriptionText": "13/04/2020",
					"highlight": "Information",
					"Info": 'OdS: 20000236'
				},
				{
					"Title": "Cod. Impianto:",
					"TitleText": "30001234",
					"SubTitle": "Cod. Cliente:",
					"SubTitleText": "10000432",
					"Description": "Data:",
					"DescriptionText": "11/04/2020",
					"highlight": "None",
					"Info": 'OdS: 20000237'
				},
				{					
					"Title": "Cod. Impianto:",
					"TitleText": "30001234",
					"SubTitle": "Cod. Cliente:",
					"SubTitleText": "10000432",
					"Description": "Data:",
					"DescriptionText": "22/04/2020",
					"highlight": "Warning",
					"Info": 'OdS: 20000238'
				},
			  ];
			var listModel =  new sap.ui.model.json.JSONModel();
			var calendarModel =  new sap.ui.model.json.JSONModel();
			listModel.setData(products);	 
			calendarModel.setData({
				startDate: new Date("2020", "10", "13", "8", "0"),
				people: [
					{
						pic: "https://github.com/SAP/openui5/blob/master/src/sap.ui.documentation/test/sap/ui/documentation/sdk/images/John_Miller.png",
						name: "John Miller",
						role: "team member",
						appointments: [
							{
								start: new Date("2020", "10", "13", "08", "00"),
								end: new Date("2020", "10", "13", "09", "00"),
								title: "OdS: 20001234",
								info: "Sostituzione Scheda",
								type: "Type07",
								pic: "sap-icon://family-care"
							},
							{
								start: new Date("2020", "10", "14", "09", "0"),
								end: new Date("2020", "10", "14", "11", "0"),
								title: "OdS: 20001234",
								info: "Verifica Tecnica",
								info: "I call you",
								type: "Type01",
								pic: "sap-icon://call"
							},
							{
								start: new Date("2020", "10", "15", "10", "00"),
								end: new Date("2020", "10", "15", "12", "00"),
								title: "Sync Bill",
								info: "Online",
								type: "Type03"
							},
							{
								start: new Date("2020", "10", "16", "10", "00"),
								end: new Date("2020", "10", "20", "13", "00"),
								title: "Check Flights",
								info: "no room",
								type: "Type09",
								pic: "sap-icon://flight"
							},
							{
								start: new Date("2020", "10", "20", "13", "00"),
								end: new Date("2020", "10", "20", "14", "00"),
								title: "Lunch",
								info: "canteen",
								type: "Type05",
								pic: "sap-icon://private"
							},
							{
								start: new Date("2020", "10", "09", "18", "00"),
								end: new Date("2020", "10", "09", "20", "00"),
								title: "Discussion of the plan",
								info: "Online meeting",
								type: "Type04"
							},
							{
								start: new Date("2020", "10", "14", "03", "00"),
								end: new Date("2020", "10", "14", "23", "00"),
								title: "Deadline",
								type: "Type05"
							},
							{
								start: new Date("2020", "10", "29", "09", "00"),
								end: new Date("2020", "10", "29", "14", "00"),
								title: "Blocker",
								info: "room 6",
								type: "Type08"
							},
							{
								start: new Date("2020", "23", "17", "09", "00"),
								end: new Date("2020", "26", "17", "18", "00"),
								title: "Boss Birthday",
								type: "Type02"
							},
							{
								start: new Date("2020", "10", "24", "09", "00"),
								end: new Date("2020", "10", "30", "18", "00"),
								title: "Urgent Planning",
								type: "Type08"
							},
							{
								start: new Date("2020", "10", "20", "01", "00"),
								end: new Date("2020", "20", "20", "23", "00"),
								title: "Planning",
								type: "Type09"
							}
						]
					},
					{
						pic: "test-resources/sap/ui/documentation/sdk/images/Donna_Moore.jpg",
						name: "Donna Moore",
						role: "team member",
						appointments: [
							{
								start: new Date("2020", "10", "13", "08", "00"),
								end: new Date("2020", "10", "13", "09", "26"),
								title: "Team sync",
								info: "Canteen",
								type: "Type07",
								pic: "sap-icon://family-care"
							},
							{
								start: new Date("2020", "10", "13", "10", "00"),
								end: new Date("2020", "10", "15", "12", "00"),
								title: "Sync John",
								info: "Online",
								type: "Type03"
							},
							{
								start: new Date("2020", "10", "16", "11", "00"),
								end: new Date("2020", "10", "16", "12", "00"),
								title: "Prep for planning",
								info: "room 5",
								type: "Type01",
								pic: "sap-icon://family-care"
							},
							{
								start: new Date("2020", "10", "17", "18", "00"),
								end: new Date("2020", "10", "17", "20", "00"),
								title: "Check Flights",
								info: "no room",
								type: "Type09",
								pic: "sap-icon://flight"
							},
							{
								start: new Date("2020", "10", "18", "18", "00"),
								end: new Date("2020", "10", "20", "20", "00"),
								title: "Discussion of the plan",
								info: "Online meeting",
								type: "Type04"
							},
							{
								start: new Date("2020", "10", "20", "01", "00"),
								end: new Date("2020", "10", "21", "23", "00"),
								title: "Planning",
								type: "Type09"
							},
							{
								start: new Date("2018", "2", "23", "01", "00"),
								end: new Date("2018", "2", "23", "23", "00"),
								title: "Off",
								type: "Type08"
							}
						]
					}
				]
			});
			this.setModel(calendarModel,"calendarModel");
			this.setModel(listModel ,"listModel");
		}
	});
});