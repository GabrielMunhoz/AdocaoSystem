const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("basic")
 .readOwn("pessoa")
 .createOwn("pessoa")
 .readAny("pets")
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
 .createAny("endereco")
 .deleteAny("endereco")
 .createAny("adocao")
 .readAny("adocao")
 .updateAny("adocao")
 .deleteAny("adocao")
 .createAny("adocao")

return ac;
})();
