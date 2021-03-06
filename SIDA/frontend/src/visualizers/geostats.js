(function (v) { "object" === typeof exports ? module.exports = v() : "function" === typeof define && define.amd ? define(v) : geostats = v() })(function () {
    var v = function (q) { return "number" === typeof q && parseFloat(q) == parseInt(q, 10) && !isNaN(q) }; Array.prototype.indexOf || (Array.prototype.indexOf = function (q, a) { if (void 0 === this || null === this) throw new TypeError('"this" is null or not defined'); var b = this.length >>> 0; a = +a || 0; Infinity === Math.abs(a) && (a = 0); 0 > a && (a += b, 0 > a && (a = 0)); for (; a < b; a++)if (this[a] === q) return a; return -1 }); return function (q) {
        this.objectID =
        ""; this.legendSeparator = this.separator = " - "; this.method = ""; this.precision = 0; this.precisionflag = "auto"; this.roundlength = 2; this.silent = this.debug = this.is_uniqueValues = !1; this.bounds = []; this.ranges = []; this.inner_ranges = null; this.colors = []; this.counter = []; this.stat_cov = this.stat_stddev = this.stat_variance = this.stat_pop = this.stat_min = this.stat_max = this.stat_sum = this.stat_median = this.stat_mean = this.stat_sorted = null; this.log = function (a, b) {
            1 != this.debug && null == b || console.log(this.objectID + "(object id) :: " +
                a)
        }; this.setBounds = function (a) { this.log("Setting bounds (" + a.length + ") : " + a.join()); this.bounds = a }; this.setSerie = function (a) { this.log("Setting serie (" + a.length + ") : " + a.join()); this.serie = a; this.resetStatistics(); this.setPrecision() }; this.setColors = function (a) { this.log("Setting color ramp (" + a.length + ") : " + a.join()); this.colors = a }; this.doCount = function () {
            if (!this._nodata()) {
                var a = this.sorted(); this.counter = []; if (1 == this.is_uniqueValues) for (var b = 0; b < this.bounds.length; b++)this.counter[b] = 0; else for (b =
                    0; b < this.bounds.length - 1; b++)this.counter[b] = 0; for (b = 0; b < a.length; b++) { var c = this.getClass(a[b]); this.counter[c]++ }
            }
        }; this.setPrecision = function (a) {
            "undefined" !== typeof a && (this.precisionflag = "manual", this.precision = a); if ("auto" == this.precisionflag) for (a = 0; a < this.serie.length; a++) { var b = isNaN(this.serie[a] + "") || -1 == (this.serie[a] + "").toString().indexOf(".") ? 0 : (this.serie[a] + "").split(".")[1].length; b > this.precision && (this.precision = b) } 20 < this.precision && (this.log("this.precision value (" + this.precision +
                ') is greater than max value. Automatic set-up to 20 to prevent "Uncaught RangeError: toFixed()" when calling decimalFormat() method.'), this.precision = 20); this.log("Calling setPrecision(). Mode : " + this.precisionflag + " - Decimals : " + this.precision); this.serie = this.decimalFormat(this.serie)
        }; this.decimalFormat = function (a) { for (var b = [], c = 0; c < a.length; c++) { var e = a[c]; e = !isNaN(parseFloat(e)) && isFinite(e); b[c] = e ? parseFloat(parseFloat(a[c]).toFixed(this.precision)) : a[c] } return b }; this.setRanges = function () {
            this.ranges =
            []; for (var a = 0; a < this.bounds.length - 1; a++)this.ranges[a] = this.bounds[a] + this.separator + this.bounds[a + 1]
        }; this.min = function () { if (!this._nodata()) { this.stat_min = this.serie[0]; for (var a = 0; a < this.pop(); a++)this.serie[a] < this.stat_min && (this.stat_min = this.serie[a]); return this.stat_min } }; this.max = function () { if (!this._nodata()) { this.stat_max = this.serie[0]; for (var a = 0; a < this.pop(); a++)this.serie[a] > this.stat_max && (this.stat_max = this.serie[a]); return this.stat_max } }; this.sum = function () {
            if (!this._nodata()) {
                if (null ==
                    this.stat_sum) for (var a = this.stat_sum = 0; a < this.pop(); a++)this.stat_sum += parseFloat(this.serie[a]); return this.stat_sum
            }
        }; this.pop = function () { if (!this._nodata()) return null == this.stat_pop && (this.stat_pop = this.serie.length), this.stat_pop }; this.mean = function () { if (!this._nodata()) return null == this.stat_mean && (this.stat_mean = parseFloat(this.sum() / this.pop())), this.stat_mean }; this.median = function () {
            if (!this._nodata()) {
                if (null == this.stat_median) {
                    this.stat_median = 0; var a = this.sorted(); this.stat_median = a.length %
                        2 ? parseFloat(a[Math.ceil(a.length / 2) - 1]) : (parseFloat(a[a.length / 2 - 1]) + parseFloat(a[a.length / 2])) / 2
                } return this.stat_median
            }
        }; this.variance = function () { var a = "undefined" === typeof a ? !0 : !1; if (!this._nodata()) { if (null == this.stat_variance) { for (var b = 0, c = this.mean(), e = 0; e < this.pop(); e++)b += Math.pow(this.serie[e] - c, 2); this.stat_variance = b / this.pop(); 1 == a && (this.stat_variance = Math.round(this.stat_variance * Math.pow(10, this.roundlength)) / Math.pow(10, this.roundlength)) } return this.stat_variance } }; this.stddev =
            function (a) { a = "undefined" === typeof a ? !0 : !1; if (!this._nodata()) return null == this.stat_stddev && (this.stat_stddev = Math.sqrt(this.variance()), 1 == a && (this.stat_stddev = Math.round(this.stat_stddev * Math.pow(10, this.roundlength)) / Math.pow(10, this.roundlength))), this.stat_stddev }; this.cov = function (a) {
                a = "undefined" === typeof a ? !0 : !1; if (!this._nodata()) return null == this.stat_cov && (this.stat_cov = this.stddev() / this.mean(), 1 == a && (this.stat_cov = Math.round(this.stat_cov * Math.pow(10, this.roundlength)) / Math.pow(10, this.roundlength))),
                    this.stat_cov
            }; this.resetStatistics = function () { this.stat_cov = this.stat_stddev = this.stat_variance = this.stat_pop = this.stat_min = this.stat_max = this.stat_sum = this.stat_median = this.stat_mean = this.stat_sorted = null }; this._nodata = function () { if (0 == this.serie.length) { if (this.silent) this.log("[silent mode] Error. You should first enter a serie!", !0); else throw new TypeError("Error. You should first enter a serie!"); return 1 } return 0 }; this._nbClassInt = function (a) {
                a = parseInt(a, 10); if (isNaN(a)) if (this.silent) this.log("[silent mode] '" +
                    a + "' is not a valid integer. Enable to set class number.", !0); else throw new TypeError("'" + a + "' is not a valid integer. Enable to set class number."); else return a
            }; this._hasNegativeValue = function () { for (var a = 0; a < this.serie.length; a++)if (0 > this.serie[a]) return !0; return !1 }; this._hasZeroValue = function () { for (var a = 0; a < this.serie.length; a++)if (0 === parseFloat(this.serie[a])) return !0; return !1 }; this.sorted = function () {
                null == this.stat_sorted && (this.stat_sorted = 0 == this.is_uniqueValues ? this.serie.sort(function (a,
                    b) { return a - b }) : this.serie.sort(function (a, b) { var c = a.toString().toLowerCase(), e = b.toString().toLowerCase(); return c < e ? -1 : c > e ? 1 : 0 })); return this.stat_sorted
            }; this.info = function () { if (!this._nodata()) { var a = "Population : " + this.pop() + " - [Min : " + this.min() + " | Max : " + this.max() + "]\n"; a += "Mean : " + this.mean() + " - Median : " + this.median() + "\n"; return a += "Variance : " + this.variance() + " - Standard deviation : " + this.stddev() + " - Coefficient of variation : " + this.cov() + "\n" } }; this.setClassManually = function (a) {
                if (!this._nodata()) if (a[0] !==
                    this.min() || a[a.length - 1] !== this.max()) if (this.silent) this.log("[silent mode] " + t("Given bounds may not be correct! please check your input.\nMin value : " + this.min() + " / Max value : " + this.max()), !0); else throw new TypeError("Given bounds may not be correct! please check your input.\nMin value : " + this.min() + " / Max value : " + this.max()); else return this.setBounds(a), this.setRanges(), this.method = "manual classification (" + (a.length - 1) + " classes)", this.bounds
            }; this.getClassEqInterval = function (a, b,
                c) { a = this._nbClassInt(a); if (!this._nodata()) { var e = "undefined" === typeof b ? this.min() : b; c = "undefined" === typeof c ? this.max() : c; b = []; var d = e; e = (c - e) / a; for (var f = 0; f <= a; f++)b[f] = d, d += e; b[a] = c; this.setBounds(b); this.setRanges(); this.method = "eq. intervals (" + a + " classes)"; return this.bounds } }; this.getQuantiles = function (a) { a = this._nbClassInt(a); for (var b = this.sorted(), c = [], e = this.pop() / a, d = 1; d < a; d++)c.push(b[Math.round(d * e + .49) - 1]); return c }; this.getClassQuantile = function (a) {
                    a = this._nbClassInt(a); if (!this._nodata()) {
                        var b =
                            this.sorted(), c = this.getQuantiles(a); c.unshift(b[0]); c[b.length - 1] !== b[b.length - 1] && c.push(b[b.length - 1]); this.setBounds(c); this.setRanges(); this.method = "quantile (" + a + " classes)"; return this.bounds
                    }
                }; this.getClassStdDeviation = function (a, b) {
                    a = this._nbClassInt(a); if (!this._nodata()) {
                        var c = this.max(), e = this.min(), d = this.stddev(), f = this.mean(), g = []; if (1 == a % 2) { var h = Math.floor(a / 2), n = h + 1; g[h] = f - d / 2; g[n] = f + d / 2; for (f = h - 1; 0 < f; f--)h = g[f + 1] - d, g[f] = h; f = n + 1 } else {
                            n = a / 2; g[n] = f; for (f = n - 1; 0 < f; f--)h = g[f + 1] - d, g[f] =
                                h; f = n + 1
                        } for (; f < a; f++)h = g[f - 1] + d, g[f] = h; g[0] = "undefined" === typeof b ? g[1] - d : e; g[a] = "undefined" === typeof b ? g[a - 1] + d : c; this.setBounds(g); this.setRanges(); this.method = "std deviation (" + a + " classes)"; return this.bounds
                    }
                }; this.getClassGeometricProgression = function (a) {
                    a = this._nbClassInt(a); if (!this._nodata()) if (this._hasNegativeValue() || this._hasZeroValue()) if (this.silent) this.log("[silent mode] geometric progression can't be applied with a serie containing negative or zero values.", !0); else throw new TypeError("geometric progression can't be applied with a serie containing negative or zero values.");
                    else { var b = [], c = this.min(), e = this.max(); c = Math.log(c) / Math.LN10; e = (Math.log(e) / Math.LN10 - c) / a; for (var d = 0; d < a; d++)b[d] = 0 == d ? c : b[d - 1] + e; b = b.map(function (f) { return Math.pow(10, f) }); b.push(this.max()); this.setBounds(b); this.setRanges(); this.method = "geometric progression (" + a + " classes)"; return this.bounds }
                }; this.getClassArithmeticProgression = function (a) {
                    a = this._nbClassInt(a); if (!this._nodata()) {
                        for (var b = 0, c = 1; c <= a; c++)b += c; var e = [], d = this.min(), f = this.max(); b = (f - d) / b; for (c = 0; c <= a; c++)e[c] = 0 == c ? d : c ==
                            a ? f : e[c - 1] + c * b; this.setBounds(e); this.setRanges(); this.method = "arithmetic progression (" + a + " classes)"; return this.bounds
                    }
                }; this.getClassJenks2 = function (a) {
                    a = this._nbClassInt(a); if (!this._nodata()) {
                        for (var b = this.sorted(), c = [], e = 0, d = b.length + 1; e < d; e++) { for (var f = [], g = 0, h = a + 1; g < h; g++)f.push(0); c.push(f) } e = []; d = 0; for (f = b.length + 1; d < f; d++) { g = []; h = 0; for (var n = a + 1; h < n; h++)g.push(0); e.push(g) } d = 1; for (f = a + 1; d < f; d++) { c[0][d] = 1; e[0][d] = 0; var k = 1; for (g = b.length + 1; k < g; k++)e[k][d] = Infinity; k = 0 } d = 2; for (f = b.length +
                            1; d < f; d++) { n = h = g = 0; for (var l = 1, m = d + 1; l < m; l++) { var u = d - l + 1; k = parseFloat(b[u - 1]); h += k * k; g += k; n += 1; k = h - g * g / n; var r = u - 1; if (0 != r) for (var p = 2, w = a + 1; p < w; p++)e[d][p] >= k + e[r][p - 1] && (c[d][p] = u, e[d][p] = k + e[r][p - 1]) } c[d][1] = 1; e[d][1] = k } k = b.length; e = []; for (d = 0; d <= a; d++)e.push(0); e[a] = parseFloat(b[b.length - 1]); e[0] = parseFloat(b[0]); for (d = a; 2 <= d;)f = parseInt(c[k][d] - 2), e[d - 1] = b[f], k = parseInt(c[k][d] - 1), --d; e[0] == e[1] && (e[0] = 0); this.setBounds(e); this.setRanges(); this.method = "Jenks2 (" + a + " classes)"; return this.bounds
                    }
                };
        this.getClassJenks = function (a) {
            a = this._nbClassInt(a); if (!this._nodata()) {
                var b = this.sorted(); jenksMatrices = function (g, h) {
                    var n = [], k = [], l, m, u = 0; for (l = 0; l < g.length + 1; l++) { var r = [], p = []; for (m = 0; m < h + 1; m++)r.push(0), p.push(0); n.push(r); k.push(p) } for (l = 1; l < h + 1; l++)for (n[1][l] = 1, k[1][l] = 0, m = 2; m < g.length + 1; m++)k[m][l] = Infinity; for (l = 2; l < g.length + 1; l++) {
                        for (var w = p = r = 0, x, y = 1; y < l + 1; y++) {
                            var z = l - y + 1; m = g[z - 1]; w++; r += m; p += m * m; u = p - r * r / w; x = z - 1; if (0 !== x) for (m = 2; m < h + 1; m++)k[l][m] >= u + k[x][m - 1] && (n[l][m] = z, k[l][m] =
                                u + k[x][m - 1])
                        } n[l][1] = 1; k[l][1] = u
                    } return { lower_class_limits: n, variance_combinations: k }
                }; var c = jenksMatrices(b, a).lower_class_limits, e = b.length - 1, d = [], f = a; d[a] = b[b.length - 1]; for (d[0] = b[0]; 1 < f;)d[f - 1] = b[c[e][f] - 2], e = c[e][f] - 1, f--; this.setBounds(d); this.setRanges(); this.method = "Jenks (" + a + " classes)"; return this.bounds
            }
        }; this.getClassUniqueValues = function () {
            if (!this._nodata()) {
                this.is_uniqueValues = !0; for (var a = this.sorted(), b = [], c = 0; c < this.pop(); c++)-1 === b.indexOf(a[c]) && b.push(a[c]); this.bounds = b; this.method =
                    "unique values"; return b
            }
        }; this.getClass = function (a) { for (var b = 0; b < this.bounds.length; b++)if (1 == this.is_uniqueValues) { if (a == this.bounds[b]) return b } else if (parseFloat(a) <= this.bounds[b + 1]) return b; return "Unable to get value's class." }; this.getRanges = function () { return this.ranges }; this.getRangeNum = function (a) { var b; for (b = 0; b < this.ranges.length; b++) { var c = this.ranges[b].split(/ - /); if (a <= parseFloat(c[1])) return b } }; this.getInnerRanges = function () {
            if (null != this.inner_ranges) return this.inner_ranges;
            for (var a = [], b = this.sorted(), c = 1, e = 0; e < b.length; e++) { if (0 == e) var d = b[e]; parseFloat(b[e]) > parseFloat(this.bounds[c]) && (a[c - 1] = "" + d + this.separator + b[e - 1], d = b[e], c++); if (c == this.bounds.length - 1) return a[c - 1] = "" + d + this.separator + b[b.length - 1], this.inner_ranges = a }
        }; this.getSortedlist = function () { return this.sorted().join(", ") }; this.getHtmlLegend = function (a, b, c, e, d, f) {
            var g = "", h = []; this.doCount(); ccolors = null != a ? a : this.colors; lg = null != b ? b : "Legend"; getcounter = null != c ? !0 : !1; fn = null != e ? e : function (n) { return n };
            null == d && (d = "default"); if ("discontinuous" == d && (this.getInnerRanges(), -1 !== this.counter.indexOf(0))) {
                if (this.silent) this.log("[silent mode] Geostats cannot apply 'discontinuous' mode to the getHtmlLegend() method because some classes are not populated.\nPlease switch to 'default' or 'distinct' modes. Exit!", !0); else throw new TypeError("Geostats cannot apply 'discontinuous' mode to the getHtmlLegend() method because some classes are not populated.\nPlease switch to 'default' or 'distinct' modes. Exit!");
                return
            } "DESC" !== f && (f = "ASC"); if (ccolors.length < this.ranges.length) if (this.silent) this.log("[silent mode] The number of colors should fit the number of ranges. Exit!", !0); else throw new TypeError("The number of colors should fit the number of ranges. Exit!"); else {
                if (0 == this.is_uniqueValues) for (a = 0; a < this.ranges.length; a++)!0 === getcounter && (g = ' <span class="geostats-legend-counter">(' + this.counter[a] + ")</span>"), c = this.ranges[a].split(this.separator), b = parseFloat(c[0]).toFixed(this.precision), c = parseFloat(c[1]).toFixed(this.precision),
                    "distinct" == d && 0 != a && (v(b) ? (b = parseInt(b) + 1, "manual" == this.precisionflag && 0 != this.precision && (b = parseFloat(b).toFixed(this.precision))) : (b = parseFloat(b) + 1 / Math.pow(10, this.precision), b = parseFloat(b).toFixed(this.precision))), "discontinuous" == d && (c = this.inner_ranges[a].split(this.separator), b = parseFloat(c[0]).toFixed(this.precision), c = parseFloat(c[1]).toFixed(this.precision)), b = fn(b) + this.legendSeparator + fn(c), b = '<div><div class="geostats-legend-block" style="background-color:' + ccolors[a] + '"></div> ' +
                    b + g + "</div>", h.push(b); else for (a = 0; a < this.bounds.length; a++)!0 === getcounter && (g = ' <span class="geostats-legend-counter">(' + this.counter[a] + ")</span>"), b = fn(this.bounds[a]), b = '<div><div class="geostats-legend-block" style="background-color:' + ccolors[a] + '"></div> ' + b + g + "</div>", h.push(b); "DESC" === f && h.reverse(); d = '<div class="geostats-legend"><div class="geostats-legend-title">' + lg + "</div>"; for (a = 0; a < h.length; a++)d += h[a]; return d + "</div>"
            }
        }; this.objectID = (new Date).getUTCMilliseconds(); this.log("Creating new geostats object");
        "undefined" !== typeof q && 0 < q.length ? (this.serie = q, this.setPrecision(), this.log("Setting serie (" + q.length + ") : " + q.join())) : this.serie = []; this.getJenks = this.getClassJenks; this.getJenks2 = this.getClassJenks2; this.getGeometricProgression = this.getClassGeometricProgression; this.getEqInterval = this.getClassEqInterval; this.getQuantile = this.getClassQuantile; this.getStdDeviation = this.getClassStdDeviation; this.getUniqueValues = this.getClassUniqueValues; this.getArithmeticProgression = this.getClassArithmeticProgression
    }
});