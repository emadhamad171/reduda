import _ from "lodash";
import { computeMove } from "./game";

// export function simple_sum_heuristic(state) {
//   return (
//     state.players[state.turn].ca.reduce((a, b) => a + b, 0) -
//     state.players[state.turn ^ 1].field.reduce((a, b) => a + b, 0)
//   );
// }

export function minimaxWithPrunning(
  alpha,
  beta,
  depth = 0,
  expectMax = true,
  state,
  maxDepth = 5,
  isMoving = 0,
) {
  let options
  const anotherPlayerIndex = state.turn === 0 ? 1 : 0
  const anotherPlayer = state.players[anotherPlayerIndex]
  const player = state.players[state.turn];

  if (state.newRound) {
    console.log(player);
    options = player.cards._stack
    if (player.type === 'bot') {
      console.log('decide lowest for bot', '!!!!!@@@@@@@@@@@@@@');
      const res = options.reduce(function (prev, curr) {
        return prev.value < curr.value ? prev : curr;
      });
      console.log('asasdasdasd', options, res);
      return res
    }
  }else{
    console.log(player.cards._stack);
    // player.cards._stack[e].value
    options = player.cards._stack
       .filter((card) => (card.value  > state.droppedCards[anotherPlayer.type][0].value && card.suit === state.droppedCards[anotherPlayer.type][0].suit ) );
  }


  console.log(options, 'asdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddd', anotherPlayer.type, expectMax);
  // if (depth === maxDepth - 1 || options.length === 0) {
  //   return { value: simple_sum_heuristic(state), index: _.sample(options) };
  // }
  if (options.length === 1 ){
    console.log('we are here no options');
    return options[0]
  }
  if (options.length === 0){
    const jokers = player.cards._stack
        .filter((card) => (card.value  > 14 ) );
    if (jokers){
      return jokers[0]
    }
    console.log(jokers, 'JOOOOOOOOKERTSSSS');
  }else {
    const res = options.reduce(function (prev, curr) {
      return prev.value < curr.value ? prev : curr;
    });
    console.log('asasdasdasd', options, res);
    return res
  }
  console.log('crossed minimal option');
  const states = options.map((card, i) => [
    i,
    _.cloneDeep(computeMove(_.cloneDeep(state), card)),
  ]);
  console.log(states);
  let max = { value: -Infinity, index: null };
  let min = { value: Infinity, index: null };

  if (expectMax) {
    console.log('we expecxt max', states);
    for (const [i, s] of states) {
      const card = minimaxWithPrunning(
        alpha,
        beta,
        depth + 1,
        s.turn === isMoving,
        _.cloneDeep(s),
        maxDepth,
        isMoving
      );
      console.log(card.value, ')((((((((((((((((((((((((((((((((((((()(()ERWERWERWER', alpha);
      if (max.value < card.value) {
        max = { value: card.value, index: i };
      }
      alpha = Math.max(alpha, max.value);
      console.log(card.value, ')((((((((((((((((((((((((((((((((((((()(()ERWERWERWER', alpha, beta);

      if (beta <= alpha) {
        console.log('we arereref finallllyyyy');
        break;
      }
    }

    return max;
  }

  for (const [i, s] of states) {
    const card = minimaxWithPrunning(
      alpha,
      beta,
      depth + 1,
      s.turn === isMoving,
      _.cloneDeep(s),
      maxDepth,
      isMoving
    );
    if (min.value > card.value) {
      min = { value: card.value, index: i };
    }
    beta = Math.min(beta, min.value);
    if (beta <= alpha) {
      break;
    }
  }

  return min;
}
