const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("basic")
 .readOwn("pessoa")
 .createOwn("pessoa")
 .updateOwn("pessoa")
 .readOwn("endereco")
 .createOwn("endereco")
 .updateOwn("endereco")
 
ac.grant("admin")
 .extend("basic")
 .createAny("pessoa")
 .readAny("pessoa")
 .updateAny("pessoa")
 .deleteAny("pessoa")
 .createAny("pets")
 .readAny("pets")
 .updateAny("pets")
 .deleteAny("pets")
 .readAny("endereco")
 .updateAny("endereco")
 .deleteAny("endereco")
return ac;
})();
