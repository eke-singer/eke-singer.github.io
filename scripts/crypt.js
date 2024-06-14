
function doMod() {
    base = parseInt(document.getElementById("mod_base").value);
    a = BigInt(document.getElementById("mod_a").value);
    b = BigInt(document.getElementById("mod_b").value);
    r = a % b;
    document.getElementById("mod_r").value = r;
}


onReady(function () {
    document.getElementById("btnMod").addEventListener("click", doMod, false);
});
