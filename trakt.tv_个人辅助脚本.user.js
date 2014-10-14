// ==UserScript==
// @name        trakt.tv 个人辅助脚本
// @namespace   https://github.com/ywzhaiqi
// @include     http://trakt.tv/calendar/my-shows*
// @version     1.1
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://cdn.staticfile.org/zepto/1.1.4/zepto.min.js
// ==/UserScript==

// 无法在线播放的链接规则
var rules = {
	'criminal minds': {
		name: '犯罪心理',
		// 存在在线播放的地址
		// yyets: 'http://www.yyets.com/resource/11003',
	},
	'hawaii five0': {
		name: '天堂执法者',
		yyets: 'http://www.yyets.com/resource/10998',
	},
	'castle 2009': {
		name: '灵书妙探',
		yyets: 'http://www.yyets.com/resource/10996',
	},
	'the big bang theory': {
		name: '生活大爆炸',
		yyets: 'http://www.yyets.com/resource/11005'
	},
	'the voice us': {
		name: '美国之声',
	},
    'marvels agents of shield': {
        name: '神盾局特工',
    },
    'arrow': {
        name: '绿箭侠'
    },
    'the amazing race': {
        name: '极速前进',
        sohu: 'http://tv.sohu.com/item/MTE5NDU1NA==.html',
    }
};

var ns = {
	init: function() {
		ns.run();
	},
	run: function() {
		$('a[href^="/show/"]').each(ns.addLink);
	},
	addLink: function(i, link) {
		var $link = $(link);
			url = $link.attr('href');

		var match = url.match(/\/show\/(.*?)\/season/);
		if (!match) {
			console.error('无法从链接中找到电视剧的名称：%s', url);
			return;
		}

		var name = match[1].replace(/-/g, ' ');
		var info = ns.getInfo(name);

		$('<a>').attr({
			href: info.url,
			title: info.title,
			target: '_blank'
		}).text(info.text).appendTo($link.prev());
	},
	getInfo: function(name) {
		var url, text, title;
		var rule = rules[name];
		if (rule) {
            Object.keys(rule).some(function(key) {
                if (key == 'name') {
                    name = rule.name
                } else {
                    url = rule[key];
                    text = key;
                    title = url;
                    return true;
                }
            });

            // title = '人人影视';
		}

		if (!url) {
			url = 'http://www.soku.com/v?keyword=' + name;
		}

		return {
			url: url,
			text: text || 'sk',
			title: title || '搜库'
		};
	}
};

ns.init();