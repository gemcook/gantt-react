# @gemcook/gantt-react


## Getting Start


### Install


`yarn add`

### Import


## Usage


```js

const tasks = [
    [
      {
        id: '1-1',
        name: 'テスト',
        start: '2019-7-18',
        end: '2019-7-19',
      },
      {
        id: '1-2',
        name: '2行目',
        start: '2019-7-21',
        end: '2019-7-22',
      },
    ],
    [
      {
        id: '2-1',
        name: 'a',
        start: '2019-7-18',
        end: '2019-7-20',
        customClass: 'aa',
      },
    ],
]

const options = {
    headerHeight: 50,
    barHeight: 30,
    viewMode: 'Day',
    language: 'ja',
  };

<Gantt tasks={tasks} options={options} />
```


## Contributing


### Install


`yarn`


### Running


`make start`


## License


