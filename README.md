## AG-Grid Stress Test using GraphQL and Apollo

This is a conversion of the [AG-Grid Streaming Stress Test](https://blog.ag-grid.com/streaming-updates-in-javascript-datagrids/) that uses GraphQL and Apollo and Redux. A Query is used to initially populate the grid using a POST request, with subsequent updates handled over websocket with a Subscription.

After running `yarn install` in both the root and server directories, start start the server with

```
yarn server
```

And then start the app with

```
yarn start
```
