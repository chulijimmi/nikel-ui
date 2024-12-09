# DatePicker Component

This component build with vite, their documentation is exist on their website https://vite.dev/.

## DatePicker Format

The datepicker will automatic formatted into string
Default format is "DD/MM/YYYY"

### Example

To use this component must be use props date and setDate, please take a look an example:

```js
function SomeComponent() {
  const [date, setDate] = useState("");
  return <DatePicker date={date} setDate={setDate} />;
}

export default App;
```
