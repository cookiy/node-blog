/*
 * jQuery UI 1.8.1
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
jQuery.ui || function(a){
    a.ui = {
        version: "1.8.1",
        plugin: {
            add: function(f, c, h){
                f = a.ui[f].prototype;
                for (var g in h) {
                    f.plugins[g] = f.plugins[g] || [];
                    f.plugins[g].push([c, h[g]])
                }
            },
            call: function(f, c, h){
                if ((c = f.plugins[c]) && f.element[0].parentNode) {
                    for (var g = 0; g < c.length; g++) {
                        f.options[c[g][0]] && c[g][1].apply(f.element, h)
                    }
                }
            }
        },
        contains: function(d, c){
            return document.compareDocumentPosition ? d.compareDocumentPosition(c) & 16 : d !== c && d.contains(c)
        },
        hasScroll: function(e, c){
            if (a(e).css("overflow") == "hidden") {
                return false
            }
            c = c && c == "left" ? "scrollLeft" : "scrollTop";
            var f = false;
            if (e[c] > 0) {
                return true
            }
            e[c] = 1;
            f = e[c] > 0;
            e[c] = 0;
            return f
        },
        isOverAxis: function(e, c, f){
            return e > c && e < c + f
        },
        isOver: function(h, c, l, k, j, i){
            return a.ui.isOverAxis(h, l, j) && a.ui.isOverAxis(c, k, i)
        },
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    };
    a.fn.extend({
        _focus: a.fn.focus,
        focus: function(d, c){
            return typeof d === "number" ? this.each(function(){
                var b = this;
                setTimeout(function(){
                    a(b).focus();
                    c && c.call(b)
                }, d)
            }) : this._focus.apply(this, arguments)
        },
        enableSelection: function(){
            return this.attr("unselectable", "off").css("MozUserSelect", "")
        },
        disableSelection: function(){
            return this.attr("unselectable", "on").css("MozUserSelect", "none")
        },
        scrollParent: function(){
            var b;
            b = a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function(){
                return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0) : this.parents().filter(function(){
                return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0);
            return /fixed/.test(this.css("position")) || !b.length ? a(document) : b
        },
        zIndex: function(d){
            if (d !== undefined) {
                return this.css("zIndex", d)
            }
            if (this.length) {
                d = a(this[0]);
                for (var c; d.length && d[0] !== document;) {
                    c = d.css("position");
                    if (c == "absolute" || c == "relative" || c == "fixed") {
                        c = parseInt(d.css("zIndex"));
                        if (!isNaN(c) && c != 0) {
                            return c
                        }
                    }
                    d = d.parent()
                }
            }
            return 0
        }
    });
    a.extend(a.expr[":"], {
        data: function(e, c, f){
            return !!a.data(e, f[3])
        },
        focusable: function(e){
            var c = e.nodeName.toLowerCase(), f = a.attr(e, "tabindex");
            return (/input|select|textarea|button|object/.test(c) ? !e.disabled : "a" == c || "area" == c ? e.href || !isNaN(f) : !isNaN(f)) && !a(e)["area" == c ? "parents" : "closest"](":hidden").length
        },
        tabbable: function(d){
            var c = a.attr(d, "tabindex");
            return (isNaN(c) || c >= 0) && a(d).is(":focusable")
        }
    })
}(jQuery);
/*
 * jQuery UI Widget 1.8.1
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(a){
    var c = a.fn.remove;
    a.fn.remove = function(b, d){
        return this.each(function(){
            if (!d) {
                if (!b || a.filter(b, [this]).length) {
                    a("*", this).add(this).each(function(){
                        a(this).triggerHandler("remove")
                    })
                }
            }
            return c.call(a(this), b, d)
        })
    };
    a.widget = function(b, j, i){
        var h = b.split(".")[0], g;
        b = b.split(".")[1];
        g = h + "-" + b;
        if (!i) {
            i = j;
            j = a.Widget
        }
        a.expr[":"][g] = function(d){
            return !!a.data(d, b)
        };
        a[h] = a[h] || {};
        a[h][b] = function(d, e){
            arguments.length && this._createWidget(d, e)
        };
        j = new j;
        j.options = a.extend({}, j.options);
        a[h][b].prototype = a.extend(true, j, {
            namespace: h,
            widgetName: b,
            widgetEventPrefix: a[h][b].prototype.widgetEventPrefix || b,
            widgetBaseClass: g
        }, i);
        a.widget.bridge(b, a[h][b])
    };
    a.widget.bridge = function(b, d){
        a.fn[b] = function(k){
            var j = typeof k === "string", i = Array.prototype.slice.call(arguments, 1), g = this;
            k = !j && i.length ? a.extend.apply(null, [true, k].concat(i)) : k;
            if (j && k.substring(0, 1) === "_") {
                return g
            }
            j ? this.each(function(){
                var f = a.data(this, b), e = f && a.isFunction(f[k]) ? f[k].apply(f, i) : f;
                if (e !== f && e !== undefined) {
                    g = e;
                    return false
                }
            }) : this.each(function(){
                var e = a.data(this, b);
                if (e) {
                    k && e.option(k);
                    e._init()
                }
                else {
                    a.data(this, b, new d(k, this))
                }
            });
            return g
        }
    };
    a.Widget = function(b, d){
        arguments.length && this._createWidget(b, d)
    };
    a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function(b, f){
            this.element = a(f).data(this.widgetName, this);
            this.options = a.extend(true, {}, this.options, a.metadata && a.metadata.get(f)[this.widgetName], b);
            var e = this;
            this.element.bind("remove." + this.widgetName, function(){
                e.destroy()
            });
            this._create();
            this._init()
        },
        _create: function(){
        },
        _init: function(){
        },
        destroy: function(){
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function(){
            return this.element
        },
        option: function(b, h){
            var g = b, f = this;
            if (arguments.length === 0) {
                return a.extend({}, f.options)
            }
            if (typeof b === "string") {
                if (h === undefined) {
                    return this.options[b]
                }
                g = {};
                g[b] = h
            }
            a.each(g, function(e, d){
                f._setOption(e, d)
            });
            return f
        },
        _setOption: function(b, d){
            this.options[b] = d;
            if (b === "disabled") {
                this.widget()[d ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", d)
            }
            return this
        },
        enable: function(){
            return this._setOption("disabled", false)
        },
        disable: function(){
            return this._setOption("disabled", true)
        },
        _trigger: function(b, j, i){
            var h = this.options[b];
            j = a.Event(j);
            j.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase();
            i = i || {};
            if (j.originalEvent) {
                b = a.event.props.length;
                for (var g; b;) {
                    g = a.event.props[--b];
                    j[g] = j.originalEvent[g]
                }
            }
            this.element.trigger(j, i);
            return !(a.isFunction(h) && h.call(this.element[0], j, i) === false || j.isDefaultPrevented())
        }
    }
})(jQuery);
/*
 * jQuery UI Mouse 1.8.1
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(a){
    a.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function(){
            var b = this;
            this.element.bind("mousedown." + this.widgetName, function(c){
                return b._mouseDown(c)
            }).bind("click." + this.widgetName, function(c){
                if (b._preventClickEvent) {
                    b._preventClickEvent = false;
                    c.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function(){
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function(d){
            d.originalEvent = d.originalEvent || {};
            if (!d.originalEvent.mouseHandled) {
                this._mouseStarted && this._mouseUp(d);
                this._mouseDownEvent = d;
                var c = this, h = d.which == 1, g = typeof this.options.cancel == "string" ? a(d.target).parents().add(d.target).filter(this.options.cancel).length : false;
                if (!h || g || !this._mouseCapture(d)) {
                    return true
                }
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet) {
                    this._mouseDelayTimer = setTimeout(function(){
                        c.mouseDelayMet = true
                    }, this.options.delay)
                }
                if (this._mouseDistanceMet(d) && this._mouseDelayMet(d)) {
                    this._mouseStarted = this._mouseStart(d) !== false;
                    if (!this._mouseStarted) {
                        d.preventDefault();
                        return true
                    }
                }
                this._mouseMoveDelegate = function(b){
                    return c._mouseMove(b)
                };
                this._mouseUpDelegate = function(b){
                    return c._mouseUp(b)
                };
                a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                a.browser.safari || d.preventDefault();
                return d.originalEvent.mouseHandled = true
            }
        },
        _mouseMove: function(b){
            if (a.browser.msie && !b.button) {
                return this._mouseUp(b)
            }
            if (this._mouseStarted) {
                this._mouseDrag(b);
                return b.preventDefault()
            }
            if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
                (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== false) ? this._mouseDrag(b) : this._mouseUp(b)
            }
            return !this._mouseStarted
        },
        _mouseUp: function(b){
            a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = b.target == this._mouseDownEvent.target;
                this._mouseStop(b)
            }
            return false
        },
        _mouseDistanceMet: function(b){
            return Math.max(Math.abs(this._mouseDownEvent.pageX - b.pageX), Math.abs(this._mouseDownEvent.pageY - b.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function(){
            return this.mouseDelayMet
        },
        _mouseStart: function(){
        },
        _mouseDrag: function(){
        },
        _mouseStop: function(){
        },
        _mouseCapture: function(){
            return true
        }
    })
})(jQuery);
(function(a){
    a.widget("ui.sortable", a.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000
        },
        _create: function(){
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? /left|right/.test(this.items[0].item.css("float")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function(){
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var b = this.items.length - 1; b >= 0; b--) {
                this.items[b].item.removeData("sortable-item")
            }
            return this
        },
        _setOption: function(d, c){
            if (d === "disabled") {
                this.options[d] = c;
                this.widget()[c ? "addClass" : "removeClass"]("ui-sortable-disabled")
            }
            else {
                a.Widget.prototype._setOption.apply(self, arguments)
            }
        },
        _mouseCapture: function(g, d){
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type == "static") {
                return false
            }
            this._refreshItems(g);
            var j = null, i = this;
            a(g.target).parents().each(function(){
                if (a.data(this, "sortable-item") == i) {
                    j = a(this);
                    return false
                }
            });
            if (a.data(g.target, "sortable-item") == i) {
                j = a(g.target)
            }
            if (!j) {
                return false
            }
            if (this.options.handle && !d) {
                var h = false;
                a(this.options.handle, j).find("*").andSelf().each(function(){
                    if (this == g.target) {
                        h = true
                    }
                });
                if (!h) {
                    return false
                }
            }
            this.currentItem = j;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function(f, d, h){
            d = this.options;
            var g = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(f);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            a.extend(this.offset, {
                click: {
                    left: f.pageX - this.offset.left,
                    top: f.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(f);
            this.originalPageX = f.pageX;
            this.originalPageY = f.pageY;
            d.cursorAt && this._adjustOffsetFromHelper(d.cursorAt);
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            this.helper[0] != this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            d.containment && this._setContainment();
            if (d.cursor) {
                if (a("body").css("cursor")) {
                    this._storedCursor = a("body").css("cursor")
                }
                a("body").css("cursor", d.cursor)
            }
            if (d.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", d.opacity)
            }
            if (d.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", d.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", f, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!h) {
                for (h = this.containers.length - 1; h >= 0; h--) {
                    this.containers[h]._trigger("activate", f, g._uiHash(this))
                }
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, f);
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(f);
            return true
        },
        _mouseDrag: function(g){
            this.position = this._generatePosition(g);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                var d = this.options, j = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - g.pageY < d.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = j = this.scrollParent[0].scrollTop + d.scrollSpeed
                    }
                    else {
                        if (g.pageY - this.overflowOffset.top < d.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = j = this.scrollParent[0].scrollTop - d.scrollSpeed
                        }
                    }
                    if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - g.pageX < d.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = j = this.scrollParent[0].scrollLeft + d.scrollSpeed
                    }
                    else {
                        if (g.pageX - this.overflowOffset.left < d.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = j = this.scrollParent[0].scrollLeft - d.scrollSpeed
                        }
                    }
                }
                else {
                    if (g.pageY - a(document).scrollTop() < d.scrollSensitivity) {
                        j = a(document).scrollTop(a(document).scrollTop() - d.scrollSpeed)
                    }
                    else {
                        if (a(window).height() - (g.pageY - a(document).scrollTop()) < d.scrollSensitivity) {
                            j = a(document).scrollTop(a(document).scrollTop() + d.scrollSpeed)
                        }
                    }
                    if (g.pageX - a(document).scrollLeft() < d.scrollSensitivity) {
                        j = a(document).scrollLeft(a(document).scrollLeft() - d.scrollSpeed)
                    }
                    else {
                        if (a(window).width() - (g.pageX - a(document).scrollLeft()) < d.scrollSensitivity) {
                            j = a(document).scrollLeft(a(document).scrollLeft() + d.scrollSpeed)
                        }
                    }
                }
                j !== false && a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, g)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (d = this.items.length - 1; d >= 0; d--) {
                j = this.items[d];
                var i = j.item[0], h = this._intersectsWithPointer(j);
                if (h) {
                    if (i != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != i && !a.ui.contains(this.placeholder[0], i) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], i) : true)) {
                        this.direction = h == 1 ? "down" : "up";
                        if (this.options.tolerance == "pointer" || this._intersectsWithSides(j)) {
                            this._rearrange(g, j)
                        }
                        else {
                            break
                        }
                        this._trigger("change", g, this._uiHash());
                        break
                    }
                }
            }
            this._contactContainers(g);
            a.ui.ddmanager && a.ui.ddmanager.drag(this, g);
            this._trigger("sort", g, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function(e, d){
            if (e) {
                a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, e);
                if (this.options.revert) {
                    var f = this;
                    d = f.placeholder.offset();
                    f.reverting = true;
                    a(this.helper).animate({
                        left: d.left - this.offset.parent.left - f.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: d.top - this.offset.parent.top - f.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function(){
                        f._clear(e)
                    })
                }
                else {
                    this._clear(e, d)
                }
                return false
            }
        },
        cancel: function(){
            var d = this;
            if (this.dragging) {
                this._mouseUp();
                this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    this.containers[c]._trigger("deactivate", null, d._uiHash(this));
                    if (this.containers[c].containerCache.over) {
                        this.containers[c]._trigger("out", null, d._uiHash(this));
                        this.containers[c].containerCache.over = 0
                    }
                }
            }
            this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
            a.extend(this, {
                helper: null,
                dragging: false,
                reverting: false,
                _noFinalSort: null
            });
            this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem);
            return this
        },
        serialize: function(e){
            var d = this._getItemsAsjQuery(e && e.connected), f = [];
            e = e || {};
            a(d).each(function(){
                var b = (a(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[-=_](.+)/);
                if (b) {
                    f.push((e.key || b[1] + "[]") + "=" + (e.key && e.expression ? b[1] : b[2]))
                }
            });
            return f.join("&")
        },
        toArray: function(e){
            var d = this._getItemsAsjQuery(e && e.connected), f = [];
            e = e || {};
            d.each(function(){
                f.push(a(e.item || this).attr(e.attribute || "id") || "")
            });
            return f
        },
        _intersectsWith: function(v){
            var u = this.positionAbs.left, t = u + this.helperProportions.width, s = this.positionAbs.top, r = s + this.helperProportions.height, q = v.left, p = q + v.width, o = v.top, m = o + v.height, n = this.offset.click.top, d = this.offset.click.left;
            n = s + n > o && s + n < m && u + d > q && u + d < p;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > v[this.floating ? "width" : "height"] ? n : q < u + this.helperProportions.width / 2 && t - this.helperProportions.width / 2 < p && o < s + this.helperProportions.height / 2 && r - this.helperProportions.height / 2 < m
        },
        _intersectsWithPointer: function(e){
            var d = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height);
            e = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width);
            d = d && e;
            e = this._getDragVerticalDirection();
            var f = this._getDragHorizontalDirection();
            if (!d) {
                return false
            }
            return this.floating ? f && f == "right" || e == "down" ? 2 : 1 : e && (e == "down" ? 2 : 1)
        },
        _intersectsWithSides: function(f){
            var d = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, f.top + f.height / 2, f.height);
            f = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, f.left + f.width / 2, f.width);
            var h = this._getDragVerticalDirection(), g = this._getDragHorizontalDirection();
            return this.floating && g ? g == "right" && f || g == "left" && !f : h && (h == "down" && d || h == "up" && !d)
        },
        _getDragVerticalDirection: function(){
            var b = this.positionAbs.top - this.lastPositionAbs.top;
            return b != 0 && (b > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function(){
            var b = this.positionAbs.left - this.lastPositionAbs.left;
            return b != 0 && (b > 0 ? "right" : "left")
        },
        refresh: function(b){
            this._refreshItems(b);
            this.refreshPositions();
            return this
        },
        _connectWith: function(){
            var b = this.options;
            return b.connectWith.constructor == String ? [b.connectWith] : b.connectWith
        },
        _getItemsAsjQuery: function(i){
            var d = [], n = [], m = this._connectWith();
            if (m && i) {
                for (i = m.length - 1; i >= 0; i--) {
                    for (var l = a(m[i]), k = l.length - 1; k >= 0; k--) {
                        var j = a.data(l[k], "sortable");
                        if (j && j != this && !j.options.disabled) {
                            n.push([a.isFunction(j.options.items) ? j.options.items.call(j.element) : a(j.options.items, j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), j])
                        }
                    }
                }
            }
            n.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (i = n.length - 1; i >= 0; i--) {
                n[i][0].each(function(){
                    d.push(this)
                })
            }
            return a(d)
        },
        _removeCurrentsFromItems: function(){
            for (var e = this.currentItem.find(":data(sortable-item)"), d = 0; d < this.items.length; d++) {
                for (var f = 0; f < e.length; f++) {
                    e[f] == this.items[d].item[0] && this.items.splice(d, 1)
                }
            }
        },
        _refreshItems: function(j){
            this.items = [];
            this.containers = [this];
            var d = this.items, p = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], j, {
                item: this.currentItem
            }) : a(this.options.items, this.element), this]], o = this._connectWith();
            if (o) {
                for (var n = o.length - 1; n >= 0; n--) {
                    for (var m = a(o[n]), l = m.length - 1; l >= 0; l--) {
                        var k = a.data(m[l], "sortable");
                        if (k && k != this && !k.options.disabled) {
                            p.push([a.isFunction(k.options.items) ? k.options.items.call(k.element[0], j, {
                                item: this.currentItem
                            }) : a(k.options.items, k.element), k]);
                            this.containers.push(k)
                        }
                    }
                }
            }
            for (n = p.length - 1; n >= 0; n--) {
                j = p[n][1];
                o = p[n][0];
                l = 0;
                for (m = o.length; l < m; l++) {
                    k = a(o[l]);
                    k.data("sortable-item", j);
                    d.push({
                        item: k,
                        instance: j,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function(f){
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            for (var d = this.items.length - 1; d >= 0; d--) {
                var h = this.items[d], g = this.options.toleranceElement ? a(this.options.toleranceElement, h.item) : h.item;
                if (!f) {
                    h.width = g.outerWidth();
                    h.height = g.outerHeight()
                }
                g = g.offset();
                h.left = g.left;
                h.top = g.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            }
            else {
                for (d = this.containers.length - 1; d >= 0; d--) {
                    g = this.containers[d].element.offset();
                    this.containers[d].containerCache.left = g.left;
                    this.containers[d].containerCache.top = g.top;
                    this.containers[d].containerCache.width = this.containers[d].element.outerWidth();
                    this.containers[d].containerCache.height = this.containers[d].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function(f){
            var d = f || this, h = d.options;
            if (!h.placeholder || h.placeholder.constructor == String) {
                var g = h.placeholder;
                h.placeholder = {
                    element: function(){
                        var b = a(document.createElement(d.currentItem[0].nodeName)).addClass(g || d.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!g) {
                            b.style.visibility = "hidden"
                        }
                        return b
                    },
                    update: function(c, b){
                        if (!(g && !h.forcePlaceholderSize)) {
                            b.height() || b.height(d.currentItem.innerHeight() - parseInt(d.currentItem.css("paddingTop") || 0, 10) - parseInt(d.currentItem.css("paddingBottom") || 0, 10));
                            b.width() || b.width(d.currentItem.innerWidth() - parseInt(d.currentItem.css("paddingLeft") || 0, 10) - parseInt(d.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            d.placeholder = a(h.placeholder.element.call(d.element, d.currentItem));
            d.currentItem.after(d.placeholder);
            h.placeholder.update(d, d.placeholder)
        },
        _contactContainers: function(i){
            for (var d = null, n = null, m = this.containers.length - 1; m >= 0; m--) {
                if (!a.ui.contains(this.currentItem[0], this.containers[m].element[0])) {
                    if (this._intersectsWith(this.containers[m].containerCache)) {
                        if (!(d && a.ui.contains(this.containers[m].element[0], d.element[0]))) {
                            d = this.containers[m];
                            n = m
                        }
                    }
                    else {
                        if (this.containers[m].containerCache.over) {
                            this.containers[m]._trigger("out", i, this._uiHash(this));
                            this.containers[m].containerCache.over = 0
                        }
                    }
                }
            }
            if (d) {
                if (this.containers.length === 1) {
                    this.containers[n]._trigger("over", i, this._uiHash(this));
                    this.containers[n].containerCache.over = 1
                }
                else {
                    if (this.currentContainer != this.containers[n]) {
                        d = 10000;
                        m = null;
                        for (var l = this.positionAbs[this.containers[n].floating ? "left" : "top"], k = this.items.length - 1; k >= 0; k--) {
                            if (a.ui.contains(this.containers[n].element[0], this.items[k].item[0])) {
                                var j = this.items[k][this.containers[n].floating ? "left" : "top"];
                                if (Math.abs(j - l) < d) {
                                    d = Math.abs(j - l);
                                    m = this.items[k]
                                }
                            }
                        }
                        if (m || this.options.dropOnEmpty) {
                            this.currentContainer = this.containers[n];
                            m ? this._rearrange(i, m, null, true) : this._rearrange(i, null, this.containers[n].element, true);
                            this._trigger("change", i, this._uiHash());
                            this.containers[n]._trigger("change", i, this._uiHash(this));
                            this.options.placeholder.update(this.currentContainer, this.placeholder);
                            this.containers[n]._trigger("over", i, this._uiHash(this));
                            this.containers[n].containerCache.over = 1
                        }
                    }
                }
            }
        },
        _createHelper: function(d){
            var c = this.options;
            d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [d, this.currentItem])) : c.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            d.parents("body").length || a(c.appendTo != "parent" ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]);
            if (d[0] == this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (d[0].style.width == "" || c.forceHelperSize) {
                d.width(this.currentItem.width())
            }
            if (d[0].style.height == "" || c.forceHelperSize) {
                d.height(this.currentItem.height())
            }
            return d
        },
        _adjustOffsetFromHelper: function(b){
            if (typeof b == "string") {
                b = b.split(" ")
            }
            if (a.isArray(b)) {
                b = {
                    left: +b[0],
                    top: +b[1] || 0
                }
            }
            if ("left" in b) {
                this.offset.click.left = b.left + this.margins.left
            }
            if ("right" in b) {
                this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
            }
            if ("top" in b) {
                this.offset.click.top = b.top + this.margins.top
            }
            if ("bottom" in b) {
                this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
            }
        },
        _getParentOffset: function(){
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                b.left += this.scrollParent.scrollLeft();
                b.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) {
                b = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function(){
            if (this.cssPosition == "relative") {
                var b = this.currentItem.position();
                return {
                    top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function(){
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function(){
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function(){
            var e = this.options;
            if (e.containment == "parent") {
                e.containment = this.helper[0].parentNode
            }
            if (e.containment == "document" || e.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!/^(document|window|parent)$/.test(e.containment)) {
                var d = a(e.containment)[0];
                e = a(e.containment).offset();
                var f = a(d).css("overflow") != "hidden";
                this.containment = [e.left + (parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0) - this.margins.left, e.top + (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0) - this.margins.top, e.left + (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, e.top + (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(f, d){
            if (!d) {
                d = this.position
            }
            f = f == "absolute" ? 1 : -1;
            var h = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = /(html|body)/i.test(h[0].tagName);
            return {
                top: d.top + this.offset.relative.top * f + this.offset.parent.top * f - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : h.scrollTop()) * f),
                left: d.left + this.offset.relative.left * f + this.offset.parent.left * f - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : h.scrollLeft()) * f)
            }
        },
        _generatePosition: function(h){
            var d = this.options, l = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, k = /(html|body)/i.test(l[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var j = h.pageX, i = h.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (h.pageX - this.offset.click.left < this.containment[0]) {
                        j = this.containment[0] + this.offset.click.left
                    }
                    if (h.pageY - this.offset.click.top < this.containment[1]) {
                        i = this.containment[1] + this.offset.click.top
                    }
                    if (h.pageX - this.offset.click.left > this.containment[2]) {
                        j = this.containment[2] + this.offset.click.left
                    }
                    if (h.pageY - this.offset.click.top > this.containment[3]) {
                        i = this.containment[3] + this.offset.click.top
                    }
                }
                if (d.grid) {
                    i = this.originalPageY + Math.round((i - this.originalPageY) / d.grid[1]) * d.grid[1];
                    i = this.containment ? !(i - this.offset.click.top < this.containment[1] || i - this.offset.click.top > this.containment[3]) ? i : !(i - this.offset.click.top < this.containment[1]) ? i - d.grid[1] : i + d.grid[1] : i;
                    j = this.originalPageX + Math.round((j - this.originalPageX) / d.grid[0]) * d.grid[0];
                    j = this.containment ? !(j - this.offset.click.left < this.containment[0] || j - this.offset.click.left > this.containment[2]) ? j : !(j - this.offset.click.left < this.containment[0]) ? j - d.grid[0] : j + d.grid[0] : j
                }
            }
            return {
                top: i - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : k ? 0 : l.scrollTop()),
                left: j - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : k ? 0 : l.scrollLeft())
            }
        },
        _rearrange: function(h, d, l, k){
            l ? l[0].appendChild(this.placeholder[0]) : d.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? d.item[0] : d.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter : 1;
            var j = this, i = this.counter;
            window.setTimeout(function(){
                i == j.counter && j.refreshPositions(!k)
            }, 0)
        },
        _clear: function(f, d){
            this.reverting = false;
            var h = [];
            !this._noFinalSort && this.currentItem[0].parentNode && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var g in this._storedCSS) {
                    if (this._storedCSS[g] == "auto" || this._storedCSS[g] == "static") {
                        this._storedCSS[g] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            }
            else {
                this.currentItem.show()
            }
            this.fromOutside && !d && h.push(function(b){
                this._trigger("receive", b, this._uiHash(this.fromOutside))
            });
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !d) {
                h.push(function(b){
                    this._trigger("update", b, this._uiHash())
                })
            }
            if (!a.ui.contains(this.element[0], this.currentItem[0])) {
                d || h.push(function(b){
                    this._trigger("remove", b, this._uiHash())
                });
                for (g = this.containers.length - 1; g >= 0; g--) {
                    if (a.ui.contains(this.containers[g].element[0], this.currentItem[0]) && !d) {
                        h.push(function(b){
                            return function(c){
                                b._trigger("receive", c, this._uiHash(this))
                            }
                        }
.call(this, this.containers[g]));
                        h.push(function(b){
                            return function(c){
                                b._trigger("update", c, this._uiHash(this))
                            }
                        }
.call(this, this.containers[g]))
                    }
                }
            }
            for (g = this.containers.length - 1; g >= 0; g--) {
                d || h.push(function(b){
                    return function(c){
                        b._trigger("deactivate", c, this._uiHash(this))
                    }
                }
.call(this, this.containers[g]));
                if (this.containers[g].containerCache.over) {
                    h.push(function(b){
                        return function(c){
                            b._trigger("out", c, this._uiHash(this))
                        }
                    }
.call(this, this.containers[g]));
                    this.containers[g].containerCache.over = 0
                }
            }
            this._storedCursor && a("body").css("cursor", this._storedCursor);
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!d) {
                    this._trigger("beforeStop", f, this._uiHash());
                    for (g = 0; g < h.length; g++) {
                        h[g].call(this, f)
                    }
                    this._trigger("stop", f, this._uiHash())
                }
                return false
            }
            d || this._trigger("beforeStop", f, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0] != this.currentItem[0] && this.helper.remove();
            this.helper = null;
            if (!d) {
                for (g = 0; g < h.length; g++) {
                    h[g].call(this, f)
                }
                this._trigger("stop", f, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function(){
            a.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel()
        },
        _uiHash: function(d){
            var c = d || this;
            return {
                helper: c.helper,
                placeholder: c.placeholder || a([]),
                position: c.position,
                originalPosition: c.originalPosition,
                offset: c.positionAbs,
                item: c.currentItem,
                sender: d ? d.element : null
            }
        }
    });
    a.extend(a.ui.sortable, {
        version: "1.8.1"
    })
})(jQuery);