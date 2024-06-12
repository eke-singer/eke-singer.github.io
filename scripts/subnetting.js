
function suffix2snm(suffix) {
    snm = 0;
    for (i = 0; i < suffix; i++) {
        snm |= 1 << (31 - i);
    }
    return snm;
}

function octets(i32, b=10) {
    c = s => (255 & (i32 >> s)).toString(b).padStart(b == 2 ? 8 : 0, "0");
    return `${c(24)}.${c(16)}.${c(8)}.${c(0)}`;
}

function toi32(o) {
    c = x => parseInt(x) >>>0;
    return ((c(o[0]) << 24) | (c(o[1]) << 16) | (c(o[2]) << 8) | (c(o[3]))) >>>0;
}

function doIPAnalyse() {
    checkIP = ip => /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(ip);
    dom = {
        ip10: document.getElementById("ip_dec"),
        ip2: document.getElementById("ip_bin"),
        suffix: document.getElementById("suffix"),
        snm10: document.getElementById("snm_dec"),
        snm2: document.getElementById("snm_bin"),
        wcm10: document.getElementById("wcm_dec"),
        wcm2: document.getElementById("wcm_bin"),
        net2: document.getElementById("netid_bin"),
        net10: document.getElementById("netid_dec"),
        bca2: document.getElementById("bca_bin"),
        bca10: document.getElementById("bca_dec"),
        range: document.getElementById("range"),
        count: document.getElementById("count")
    };
    if (!checkIP(dom.ip10.value)) {
        dom.ip10.style.color = "#0f0";
        return;
    }
    //alert(dom.ip10.value.split("."));
    ip = toi32(dom.ip10.value.split("."));
    suffix = parseInt(dom.suffix.value);
    if (isNaN(suffix)) {
        dom.suffix.style.color = "#f00";
        return;
    }
    if (suffix < 1 || suffix > 31) {
        dom.suffix.style.color = "#f00";
        return;
    }
    snm = suffix2snm(suffix);
    dom.snm10.value = octets(snm);
    dom.snm2.value = octets(snm, 2);
    dom.wcm10.value = octets(~snm);
    dom.wcm2.value = octets(~snm, 2);
    dom.ip2.value = octets(ip, 2);
    dom.net10.value = octets(ip & snm);
    dom.net2.value = octets(ip & snm, 2);
    dom.bca10.value = octets(ip | ~snm);
    dom.bca2.value = octets(ip | ~snm, 2);
    dom.range.value = `${octets((ip & snm) + 1)}   bis   ${octets((ip | ~snm) - 1)}`;
    dom.count.value = 2 ** (32 - suffix) - 2;
}

onReady(function () {
    document.getElementById("btnIPAnalyse").addEventListener("click", doIPAnalyse, false);
});
