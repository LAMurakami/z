// Ad module

Manager.addMethods({
    'Ad': new Module('Ad', 'this module handles all add display functions')
});

makeOrd = function() {    
    var ord = Math.round(10000000*Math.random())
    while (ord.length<9){
        ord="0"+ord
    }
    return ord;
}

USN.Ad.site = USN.site;
USN.Ad.zone = USN.zone;
USN.Ad.ord = makeOrd();
USN.Ad.tile = 1;

first = true;

USN.Ad.positionMap = $H({
    leaderboardA: {dim: '728x90,950x30', map : 'top' },
    leaderboardB: { dim: '728x90,468x60', map : 'bot' },
    badgeA: {dim: '180x90'},
    badgeB: {dim: '120x90'},
    badgeC: {dim: '120x90'},
    badgeD: {dim: '120x90'},
    badgeE: {dim: '120x90', 'deferred': true},
    rectangleA: {dim: '336x280,300x250,300x600', map : 'top'},
    rectangleB: {dim: '336x280,300x250,300x600,330x140', map : 'bot'},
    rectangleC: {dim: '300x150'},
    skyscraperA: {dim: '160x600'},
    skyscraperB: {dim: '160x600'},
    skyscraperC: {dim: '160x600'},
    verticalA: {dim: '120x240'},
    video1: {dim: '468x60'},
    boxA: {dim: '300x125'},
    boxB: {dim: '330x140'},
    xxlA: {dim: '468x648'},
    usnuca: {dim: '237x92'},
    usnucb: {dim: '237x92'},
    usnucc: {dim: '237x92'},
    usnucd: {dim: '237x92'},
    anchor: {dim: '1x1,950x65'},
    stitial: {dim: '1x1,500x500'}
})

USN.Ad.getSafeString = function(str, len) {
    var str_len = (arguments.length == 2) ? len : 32;
    return str.split(':').last().replace(/[^A-Za-z\/]+/g, '').substring(0,str_len).toLowerCase();
}

USN.Ad.checkReferer = function() {
    var refs = $H({
        'aol.money' : /^http:\/\/money\.aol\.com/
    });
    var exclusions = $H({
        'aol.money': "aolmoney"
    });
    var exclusion = false
    refs.each( function(ref) {
        ref_id = ref[0];
        regexp = ref[1];
        if (document.referrer.match(regexp)) {
            exclusion = "!c=" + exclusions.get(ref_id) + ";";
        }
    });
    return exclusion;
}

USN.Ad.checkKeys = function() {
    var meta_keys = $$('meta').findAll( function(tag) { return tag.name === "keys" } );
    this.keyObj = {};
    this.keyCheckDone = true;
    for (i = 0; i < meta_keys.length; i++) {
        content = $H(meta_keys[i].content.evalJSON());
        this.keyObj[content.keys()[0]] = content.values()[0]
    }
}

USN.Ad.inKws = function (kws,kw) {
    for (var i=0; i<kws.length;i++) {
        if (kws[i]==kw) return true;
    }
    return false;
}

USN.Ad.make = function(adPosition) {
    if (!this.keyCheckDone) { this.checkKeys();}
    //var ord = Math.round(10000000*Math.random())
    //while (ord.length<9){
    //    ord="0"+ord
    //}
    var ord = this.ord;
    var tile = this.tile;
    this.tile++;
    //#FIXME: raise exception if adPosition not in positionMap
    position = this.positionMap.get(adPosition)
    position = $H(position);
    if (position.keys().include('deferred') && position.get('deferred')) {
        return;
    }
    //hack for armypoe
    if (this.site.indexOf("Premium College") >= 0) {
       
       var army=true;
       var cookie, enc_item;
       var cookies=document.cookie.split(/\s*;\s*/);
       while (cookie = cookies.shift()) {
          if (cookie.match(/^c=/)) {
             army=false;
             break;
          }
       }
       if (army) {
         this.site='poearmy';
       }
    }
    //take everything after last ":", remove any digits and whitespace at start of string and use only first 64 chars 
    this.site = this.getSafeString(this.site, 32);

    this.zone = this.getSafeString(this.zone, 45);
    exclusion = this.checkReferer();
    exclusion = (exclusion) ? exclusion : "";
    if (this.keyObj) {
        var kv = "";
        $H(this.keyObj).each( function(pair) {
            kv += ";" + pair.key + "=" + pair.value;
        });
    }
    var kws=new Array();
    var kwSeq='kw='+this.site+';';
    kws.push(this.site);
    var zone_kw=this.zone.split(/\//);
    for (var i=0; i < zone_kw.length;i++) {
        if (!this.inKws(kws,zone_kw[i])) {
            kwSeq +='kw='+zone_kw[i]+';';
            kws.push(zone_kw[i]);
        }
    }
    var meta_kw = $$('meta').findAll( function(tag) { return tag.name === "keywords" } );
    for (var i = 0; i < meta_kw.length; i++) {
    	var tags = meta_kw[i].content.split(/[,;]\s*/);
        for(var j=0; j< tags.length; j++) {
            var tag=this.getSafeString(tags[j],64);
            if (!this.inKws(kws,tag)) {
	        kwSeq+='kw='+tag+';';
                kws.push(tag);
	    }
        }
    }
    var querysegs=window.location.search.replace(/\?/,'').split('&')
    for (var i =0; i<querysegs.length;i++) {
        if (querysegs[i].indexOf("q=") > -1) {
	    kwSeq += "kw="+querysegs[i].substring(querysegs[i].indexOf('=')+1) +";";
        }
    }
    if (position.get('map')) {
        adPosition = position.get('map');
    }
    if(first){
        adURI = new Template("http://ad.doubleclick.net/adj/usn.#{site}/#{zone};#{kwSeq}#{segQS}dcopt=ist;sz=#{dim};tile=#{tile};pos=#{position};#{exclusion}ord=#{ord}#{kv}?").evaluate({'site': this.site, 'zone': this.zone, 'kwSeq': kwSeq, 'dim': position.get('dim'), 'position': adPosition, 'exclusion': exclusion, 'ord': ord, 'tile': tile, 'kv': kv, 'segQS': segQS});
        first = false;
    }
    else{
        adURI = new Template("http://ad.doubleclick.net/adj/usn.#{site}/#{zone};#{kwSeq}#{segQS}sz=#{dim};tile=#{tile};pos=#{position};#{exclusion}ord=#{ord}#{kv}?").evaluate({'site': this.site, 'zone': this.zone, 'kwSeq': kwSeq, 'dim': position.get('dim'), 'position': adPosition, 'exclusion': exclusion, 'ord': ord, 'tile': tile, 'kv': kv, 'segQS': segQS});
    }
        
    

    
    adURI = encodeURI(adURI)
    document.write("<script type=\"text/javascript\" src=\""+adURI+"\"><\/script>");
    return adURI;


}
//Preserves backward-compatibility by aliasing dblclick to the 'make' method of the Ad module
dblclick = USN.Ad.make.bind(USN.Ad);
