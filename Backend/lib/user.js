/**
 * Creacion new user.
 * @param {org.tfg.model.CreateUser} createUser The createUser transaction instance.
 * @transaction
 */

function CreateUser(user) {
    return getParticipantRegistry('org.tfg.model.UserParticipant')
        .then(function (participantRegistry) {
            return participantRegistry.exists(user.userId);
        })
        .then(function (exists) {
            if (!exists) {
                return getParticipantRegistry('org.tfg.model.UserParticipant')
                    .then(function (participantRegistry) {
                        var newUser = getFactory().newResource('org.tfg.model', 'UserParticipant', user.userId);
                        newUser.name = user.name;
                        newUser.surname = user.surname;
                        newUser.email = user.email;
                        newUser.numberPhone = user.numberPhone;
                        newUser.address = user.address;
                        newUser.card = user.card;
                        newUser.account = user.account

                        return participantRegistry.add(newUser);
                    });
            } else {
                throw new Error("This user already exist");
            }
        })
        .catch(function (error) {
            throw new Error(error);
        });
}

/**
* Login. Check if the user exists in the blockchain
* @param {org.tfg.model.Login} login The login transaction instance.
* @transaction
*/

function Login(user) {
    var userId = user.user.userId;
    return getParticipantRegistry('org.tfg.model.UserParticipant')
        .then(function (participantRegistry) {
            return participantRegistry.exists(userId);
        })
        .then(function (exists) {
            if (!exists) {
                throw new Error("El usuario no existe");
            }
        })
        .catch(function (error) {
            throw new Error(error);
        });
}

/**
* Transaction to update user information
* @param {org.tfg.model.UpdateProfile} updateProfile The updateProfile transaction instance.
* @transaction
*/

function updateProfile(updateProfile) {
    var user = updateProfile.user;
    user.name = updateProfile.name;
    user.surname = updateProfile.surname;
    user.numberPhone = updateProfile.numberPhone;
    user.address = updateProfile.address;


    return getParticipantRegistry('org.tfg.model.UserParticipant')
        .then(function (userParticipant) {
            return userParticipant.update(user);
        })
        .catch(function (error) {
            throw new Error(error);
        });
}
