

<h1>Javascript port of <a href='https://github.com/dimka665/range-regex'>dimka665's</a> numeric range to regex generator</h1>
<p> To use, simply clone repository and source range2regex.js in your code</p>
<br>
Example:
```
<script src="range2regex.js">
<script>
    console.log( split_to_patterns( 5, 10 ) ) // ["[5-9]", "10"]
    console.log( split_to_patterns( 5, 10 ).join('|') ) // "[5-9]|10"
</script>
```
