function reloadJSTrackRecord() {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.src = './jquery.sortable.min.js';
	head.appendChild(script);
}

function reloadJSMarketComparison() {
	var head = document.getElementsByTagName('head')[0];
	var script0 = document.createElement('script');
	script0.src = './industry_chart.js';
	head.appendChild(script0);
	var script1 = document.createElement('script');
	script1.src = './stock1.js';
	head.appendChild(script1);
	var script2 = document.createElement('script');
	script2.src = './stock2.js';
	head.appendChild(script2);
	var script3 = document.createElement('script');
	script3.src = './stock3.js';
	head.appendChild(script3);
	var script4 = document.createElement('script');
	script4.src = './stock4.js';
	head.appendChild(script4);
}

function reloadOld() {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js';
	head.appendChild(script);
	var script2 = document.createElement('script');
	script2.src = './chart.js';
	head.appendChild(script2);
	// head.appendChild(script6);
	var script7 = document.createElement('script');
	script7.src = 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js';
	head.appendChild(script7);
}

var current = 0;
var nothing = "";
var text1 =
	'<div style="overflow-x:auto;">\
	<table id="flips_table" class="table"> \
        <thead>\
	      <tr>\
	        <th>Name ↑↓</th>\
	        <th>Quantity ↑↓</th>\
	        <th>Buy Price (per item)</th>\
	        <th>Buy Date</th>\
	        <th>Sell Price (per item)</th>\
	        <th>Sell Date</th>\
			<th>Time Held ↑↓</th>\
	        <th>Fees</th>\
	        <th>Gross Gain / Loss ↑↓</th>\
	        <th>Net Gain / Loss ↑↓</th>\
	        <th>Return on Investment (%) ↑↓</th>\
	      </tr>\
	    </thead>\
	    <tbody>\
	      <tr>\
	        <td>Yeezy 350 v2 Glow</td>\
	        <td>4</td>\
	        <td>$470</td>\
	        <td>5/25/19</td>\
	        <td>$650</td>\
	        <td>7/14/19</td>\
	        <td>02 months</td>\
	        <td>$208</td>\
	        <td><font color="#11d128">$720</font></td>\
	        <td><font color="#11d128">$512</font></td>\
	        <td><font color="#11d128">27%</font></td>\
	      </tr>\
	      <tr>\
	        <td>Travis Scott Air Jordan 4</td>\
	        <td>5</td>\
	        <td>$330</td>\
	        <td>12/13/18</td>\
	        <td>$528</td>\
	        <td>7/14/19</td>\
	        <td>07 months</td>\
	        <td>$211</td>\
	        <td><font color="#11d128">$990</font></td>\
	        <td><font color="#11d128">$779</font></td>\
	        <td><font color="#11d128">47%</font></td>\
	      </tr>\
	      <tr>\
	        <td>Yeezy 350 v2 Cream</td>\
	        <td>3</td>\
	        <td>$235</td>\
	        <td>1/22/19</td>\
	        <td>$360</td>\
	        <td>7/14/19</td>\
	        <td>06 months</td>\
	        <td>$86</td>\
	        <td><font color="#11d128">$375</font></td>\
	        <td><font color="#11d128">$289</font></td>\
	        <td><font color="#11d128">41%</font></td>\
	      </tr>\
	      <tr>\
	        <td>Air Jordan 1 Bred Toe</td>\
	        <td>3</td>\
	        <td>$277</td>\
	        <td>2/20/18</td>\
	        <td>$488</td>\
	        <td>2/9/19</td>\
	        <td>12 months</td>\
	        <td>$117</td>\
	        <td><font color="#11d128">$633</font></td>\
	        <td><font color="#11d128">$516</font></td>\
	        <td><font color="#11d128">62%</font></td>\
	      </tr>\
	      <tr>\
	        <td>Union LA Air Jordan 1</td>\
	        <td>2</td>\
	        <td>$573</td>\
	        <td>12/21/18</td>\
	        <td>$1,227</td>\
	        <td>3/15/19</td>\
	        <td>03 months</td>\
	        <td>$196</td>\
	        <td><font color="#11d128">$1,308</font></td>\
	        <td><font color="#11d128">$1,112</font></td>\
	        <td><font color="#11d128">97%</font></td>\
	      </tr>\
	      <tr>\
	        <td>Air Jordan 1 Not For Resale</td>\
	        <td>2</td>\
	        <td>$780</td>\
	        <td>2/16/19</td>\
	        <td>$677</td>\
	        <td>3/8/19</td>\
	        <td>01 months</td>\
	        <td>$108</td>\
	        <td><font color="#d13b3c">-$206</font></td>\
	        <td><font color="#d13b3c">-$314</font></td>\
	        <td><font color="#d13b3c">-20%</font></td>\
	      </tr>\
	      <tr>\
	        <td>Off-White Air Jordan 1 Chicago</td>\
	        <td>1</td>\
	        <td>$1,184</td>\
	        <td>12/12/18</td>\
	        <td>$3,400</td>\
	        <td>6/4/19</td>\
	        <td>06 months</td>\
	        <td>$272</td>\
	        <td><font color="#11d128">$2,216</font></td>\
	        <td><font color="#11d128">$1,944</font></td>\
	        <td><font color="#11d128">164%</font></td>\
	      </tr>\
	      <tr>\
	        <td>Off-White Nike Presto OG</td>\
	        <td>1</td>\
	        <td>$1,470</td>\
	        <td>3/2/18</td>\
	        <td>$2,200</td>\
	        <td>4/1/19</td>\
	        <td>13 months</td>\
	        <td>$176</td>\
	        <td><font color="#11d128">$730</font></td>\
	        <td><font color="#11d128">$554</font></td>\
	        <td><font color="#11d128">38%</font></td>\
	      </tr>\
	      <tr>\
	        <td>Air Jordan 5 Trophy Room</td>\
	        <td>2</td>\
	        <td>$600</td>\
	        <td>5/18/19</td>\
	        <td>$1,200</td>\
	        <td>7/14/19</td>\
	        <td>02 months</td>\
	        <td>$192</td>\
	        <td><font color="#11d128">$1,200</font></td>\
	        <td><font color="#11d128">$1,008</font></td>\
	        <td><font color="#11d128">84%</font></td>\
	      </tr>\
	      <tr>\
	        <td>Serena Williams Off White Nike Air Max 97</td>\
	        <td>1</td>\
	        <td>$900</td>\
	        <td>1/18/19</td>\
	        <td>$1,150</td>\
	        <td>6/14/19</td>\
	        <td>05 months</td>\
	        <td>$92</td>\
	        <td><font color="#11d128">$250</font></td>\
	        <td><font color="#11d128">$158</font></td>\
	        <td><font color="#11d128">18%</font></td>\
	      </tr>\
	      <tr>\
	        <td>Raptor OVO Air Jordan 4</td>\
	        <td>1</td>\
	        <td>$375</td>\
	        <td>6/13/19</td>\
	        <td>$225</td>\
	        <td>7/14/19</td>\
	        <td>02 months</td>\
	        <td>$18</td>\
	        <td><font color="#d13b3c">-$150</font></td>\
	        <td><font color="#d13b3c">-$168</font></td>\
	        <td><font color="#d13b3c">-45%</font></td>\
	      </tr>\
	    </tbody>\
    </table>\
</div>\
</br>\
Above is the <b>complete portfolio</b> of investments we have made as a collective<sup>4</sup>.\
The more confident we are in a certain streetwear item, the more we invest. Whether it be one month or one year investments, the majority of the items that we have held have proven to be profitable, with ROI’s ranging from 18% to 164% after transaction fees. In the bigger picture, the positives outweigh the negatives, resulting in a consistent net profit in our diverse portfolio.\
</br>\
</br>\
Note that we calculated our final numbers by including an average 8% fee that transactions incur. Even with fees, however, streetwear can still turn extremely large profit margins.\
</br>\
</br>\
<div class="asterisk"><sup>4</sup>Prior investments made by team members independently are uncharted.</div>\
</br>\
</br>'
	;
var text2 =
	'<div>\
	<span id="industry_chart" class="left"></span>\
<div>\
	<span id="stock1"></span>\
	<span id="stock2"></span>\
</div>\
<div>\
	<span id="stock3"></span>\
	<span id="stock4"></span>\
</br>\
</br>\
</div>\
The charts above display trends in streetwear items and stocks within six months. The streetwear items, which we display by utilizing <b><a href="https://stockx.com" target="_blank">StockX</a> market prices</b>, are all past investments we have made. For comparison, we provide an <b>unbiased representation of the stock market</b>, so we choose the three largest companies by market capitalization from a variety of sectors: consumer technology, automobile, and bio-technology. These sectors best represent popular material goods that are comparable to streetwear. We also included S&P500, NASDAQ, and Dow Jones, which provide a holistic perspective of the stock market.\
</br>\
</br>\
When choosing to buy and sell at the right time frame, many items consistently match or exceed those of the stock market. Based on the calculations displayed above as well as the numbers from our track record of “flips” (click the <b>“Track Record” button</b>), the ROI of streetwear items is often greater. In addition to exhibiting <b>steeper positive trends</b>, the streetwear market experiences <b>smaller fluctuations</b>, indicating less volatility and more predictability. \
</br>\
</br>\
</br>\
</div>'
	;

export function trackRecord() {
	var x = document.getElementById("button_text");
	var temp = document.createElement("div");
	// temp.innerHTML = x.innerHTML;
	// if (current === 0) {
	// 	current = 1;
	// 	x.innerHTML = text1;
	// 	reloadJSTrackRecord();
	// } else if (current === 2) {
	// 	current = 1;
	// 	x.innerHTML = text1 + text2;
	// 	x.innerHTML = text1;
	// 	reloadJSTrackRecord();
	// } else {
	// 	current = 0;
	// 	x.innerHTML = nothing;
	// }
}

export function marketComparison() {
	var x = document.getElementById("button_text");
	var temp = document.createElement("div");
	// temp.innerHTML = x.innerHTML;
	// temp.innerHTML = x.innerHTML;
	// if (current === 0) {
	// 	current = 2;
	// 	x.innerHTML = text2;
	// 	reloadJSMarketComparison();
	// } else if (current === 1) {
	// 	current = 2;
	// 	x.innerHTML = text2 + text1;
	// 	x.innerHTML = text2;
	// 	reloadJSMarketComparison();
	// } else {
	// 	current = 0;
	// 	x.innerHTML = nothing;
	// }
}
