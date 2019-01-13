/**
 * 
 * @param {org.tfg.model.SetupDemo1} SetupDemo1 The SetupDemo1 transaction instance.
 * @transaction
 */

function SetupDemo1() {
    return getParticipantRegistry('org.tfg.model.DistributorParticipant')
        .then(function (participantRegistry) {
            var distributor = getFactory().newResource('org.tfg.model', 'DistributorParticipant', "1");
            distributor.companyName = "Falcon";
            return participantRegistry.add(distributor)
                .then(function (distributor) {
                    return getParticipantRegistry('org.tfg.model.CarrierParticipant')
                        .then(function (participantRegistry) {
                            var carrier = getFactory().newResource('org.tfg.model', 'CarrierParticipant', "1");
                            carrier.name = "Transportista"
                            carrier.surname = "General"
                            return participantRegistry.add(carrier);
                        })
                        .catch(function (error) {
                            throw new Error(error);
                        });
                }).catch(function (error) {
                    throw new Error(error);
                });

        })
        .catch(function (error) {
            throw new Error(error);
        });
}

/**
* Transaction
* @param {org.tfg.model.SetupDemo2} SetupDemo2 The createHeadQuarters transaction instance.
* @transaction
*/

function SetupDemo2(){
  return getAssetRegistry('org.tfg.model.HeadQuarter')
        .then(function (registryHeadQuarters) {
            var headquarter1 = getFactory().newResource('org.tfg.model', 'HeadQuarter', "1");
    		headquarter1.distributor = getFactory().newRelationship('org.tfg.model', 'DistributorParticipant', "1");

            headquarter1.headquarterId = "1"
  			headquarter1.headquarterName = "Sede Centro"
    
    		var factory = getFactory();
    		var address = factory.newConcept('org.tfg.base', 'Address');
            
            address.address= "Centro"
            address.latitude= 40.419895
            address.longitude= -3.701600
    		headquarter1.address = address
                
            var headquarter2 = getFactory().newResource('org.tfg.model', 'HeadQuarter', "2");
    		headquarter2.distributor = getFactory().newRelationship('org.tfg.model', 'DistributorParticipant', "1");

            headquarter2.headquarterId = "2"
  			headquarter2.headquarterName = "Sede Collado Villalba"
    
    		var factory = getFactory();
    		var address = factory.newConcept('org.tfg.base', 'Address');
            
            address.address= "Collado Villalba"
            address.latitude= 40.630637
            address.longitude= -4.006033
    		headquarter2.address = address
              			
            var headquarter3 = getFactory().newResource('org.tfg.model', 'HeadQuarter', "3");
    		headquarter3.distributor = getFactory().newRelationship('org.tfg.model', 'DistributorParticipant', "1");

            headquarter3.headquarterId = "3"
  			headquarter3.headquarterName = "Sede San Sebastian de los Reyes"
    
    		var factory = getFactory();
    		var address = factory.newConcept('org.tfg.base', 'Address');
            
            address.address= "San Sebastian de los Reyes"
            address.latitude= 40.558448
            address.longitude= -3.626480
    		headquarter3.address = address
    
            var headquarter4 = getFactory().newResource('org.tfg.model', 'HeadQuarter', "4");
    		headquarter4.distributor = getFactory().newRelationship('org.tfg.model', 'DistributorParticipant', "1");

            headquarter4.headquarterId = "4"
  			headquarter4.headquarterName = "Sede Torrejón de Ardoz"
    
    		var factory = getFactory();
    		var address = factory.newConcept('org.tfg.base', 'Address');
            
            address.address= "Collado Villalba"
            address.latitude= 40.457436
            address.longitude= -3.476394
    		headquarter4.address = address
    
            var headquarter5 = getFactory().newResource('org.tfg.model', 'HeadQuarter', "5");
    		headquarter5.distributor = getFactory().newRelationship('org.tfg.model', 'DistributorParticipant', "1");

            headquarter5.headquarterId = "5"
  			headquarter5.headquarterName = "Sede Parla"
    
    		var factory = getFactory();
    		var address = factory.newConcept('org.tfg.base', 'Address');
            
            address.address= "Collado Villalba"
            address.latitude= 40.232440
            address.longitude= -3.769741
    		headquarter5.address = address

    return registryHeadQuarters.addAll([headquarter1, headquarter2, headquarter3, headquarter4, headquarter5]);
         })
      	 .catch(function (error) {
             throw new Error(error);
         });
}

/**
* Transaction
* @param {org.tfg.model.SetupDemo3} SetupDemo3 The SetupDemo3 transaction instance.
* @transaction
*/

function SetupDemo3(){
    return getAssetRegistry('org.tfg.model.Carrier')
            .then(function (registryCarriers) {
                var carrier1 = getFactory().newResource('org.tfg.model', 'Carrier', "1111");
                carrier1.carrier = getFactory().newRelationship('org.tfg.model', 'CarrierParticipant', "1");
      			carrier1.headquarter = getFactory().newRelationship('org.tfg.model', 'HeadQuarter', "1");
      			carrier1.name = "Juan"
      			carrier1.surname = "Pérez"
      
      			var carrier2 = getFactory().newResource('org.tfg.model', 'Carrier', "1112");
                carrier2.carrier = getFactory().newRelationship('org.tfg.model', 'CarrierParticipant', "1");
      			carrier2.headquarter = getFactory().newRelationship('org.tfg.model', 'HeadQuarter', "1");
      			carrier2.name = "Laura"
      			carrier2.surname = "Benzal"
      
            	var carrier3 = getFactory().newResource('org.tfg.model', 'Carrier', "1113");
                carrier3.carrier = getFactory().newRelationship('org.tfg.model', 'CarrierParticipant', "1");
      			carrier3.headquarter = getFactory().newRelationship('org.tfg.model', 'HeadQuarter', "2");
      			carrier3.name = "Dmytro"
      			carrier3.surname = "Zilnyk"
      
                var carrier4 = getFactory().newResource('org.tfg.model', 'Carrier', "1114");
                carrier4.carrier = getFactory().newRelationship('org.tfg.model', 'CarrierParticipant', "1");
      			carrier4.headquarter = getFactory().newRelationship('org.tfg.model', 'HeadQuarter', "2");
      			carrier4.name = "Marta"
      			carrier4.surname = "Pacheco"
      
                var carrier5 = getFactory().newResource('org.tfg.model', 'Carrier', "1115");
                carrier5.carrier = getFactory().newRelationship('org.tfg.model', 'CarrierParticipant', "1");
      			carrier5.headquarter = getFactory().newRelationship('org.tfg.model', 'HeadQuarter', "3");
      			carrier5.name = "María"
      			carrier5.surname = "Sanz"
      
                var carrier6 = getFactory().newResource('org.tfg.model', 'Carrier', "1116");
                carrier6.carrier = getFactory().newRelationship('org.tfg.model', 'CarrierParticipant', "1");
      			carrier6.headquarter = getFactory().newRelationship('org.tfg.model', 'HeadQuarter', "3");
      			carrier6.name = "Fernando"
      			carrier6.surname = "Jiménez"
      
      			var carrier7 = getFactory().newResource('org.tfg.model', 'Carrier', "1117");
                carrier7.carrier = getFactory().newRelationship('org.tfg.model', 'CarrierParticipant', "1");
      			carrier7.headquarter = getFactory().newRelationship('org.tfg.model', 'HeadQuarter', "4");
      			carrier7.name = "Pilar"
      			carrier7.surname = "Delgado"
      
      			var carrier8 = getFactory().newResource('org.tfg.model', 'Carrier', "1118");
                carrier8.carrier = getFactory().newRelationship('org.tfg.model', 'CarrierParticipant', "1");
      			carrier8.headquarter = getFactory().newRelationship('org.tfg.model', 'HeadQuarter', "4");
      			carrier8.name = "Pedro"
      			carrier8.surname = "Montilla"
      
      			var carrier9 = getFactory().newResource('org.tfg.model', 'Carrier', "1119");
                carrier9.carrier = getFactory().newRelationship('org.tfg.model', 'CarrierParticipant', "1");
      			carrier9.headquarter = getFactory().newRelationship('org.tfg.model', 'HeadQuarter', "5");
      			carrier9.name = "Gema"
      			carrier9.surname = "Fernández"
      
      			var carrier10 = getFactory().newResource('org.tfg.model', 'Carrier', "1120");
                carrier10.carrier = getFactory().newRelationship('org.tfg.model', 'CarrierParticipant', "1");
      			carrier10.headquarter = getFactory().newRelationship('org.tfg.model', 'HeadQuarter', "5");
      			carrier10.name = "David"
      			carrier10.surname = "Pérez"
      			return registryCarriers.addAll([carrier1, carrier2, carrier3, carrier4, carrier5, carrier6, carrier7, carrier8, carrier9, carrier10])
      
    }).catch(function (error) {
             throw new Error(error);
         });
}
                  
