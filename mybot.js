function new_game() {
}

function make_move() {
   var board = get_board();

   // we found an item! take it!
   var item_on_tile = this.get_item_on_tile(get_my_x(), get_my_y())
   var types_to_ignore = this.types_to_ignore()
   if((item_on_tile > 0) && (types_to_ignore.indexOf(item_on_tile) == -1)) {
      return TAKE;
   }

   if(get_board().length > get_board()[0].length){
      length_or_width = get_board().length
   } else {
      length_or_width = get_board()[0].length
   }

   for (var i = 1; i < length_or_width; i++) {
      if(this.should_go_east(i)){
         console.log('going east')
         return EAST
      } else if (this.should_go_west(i)) {
         console.log('going west')
         return WEST
      } else if (this.should_go_south(i)) {
         console.log('going south')
         return SOUTH
      } else if (this.should_go_north(i)) {
         console.log('going north')
         return NORTH
      } else if (this.should_go_east(i, true)) {
         console.log('going east')
         return EAST
      } else if (this.should_go_west(i, true)) {
         console.log('going east')
         return WEST
      }
   }
}

function get_item_on_tile(x, y){
   if(x<0 || y < 0 || x > (get_board().length - 1) || y > (get_board()[0].length - 1)){
      return 0
   }
   return get_board()[x][y]
}

function types_to_ignore() {
   var types_to_ignore = []

   for (var type=0; type < get_number_of_item_types(); type+=1) {
      var total_items = get_total_item_count(type+1)
      var mine = get_my_item_count(type+1)
      var opponents = get_opponent_item_count(type+1)
      if(opponents/total_items >= .5 || mine/total_items > .5){
         types_to_ignore.push(type+1)
      }
   }
   return types_to_ignore
}

function should_go_east(tile, diag) {
   var types_to_ignore = this.types_to_ignore()
   if(diag === true){
      var item_on_tile = get_item_on_tile(get_my_x() + tile, get_my_y() + tile)
      if (item_on_tile > 0 && types_to_ignore.indexOf(item_on_tile) === -1) {
         return true
      }

      var item_on_tile = get_item_on_tile(get_my_x() + tile, get_my_y() - tile)
      if (item_on_tile > 0 && types_to_ignore.indexOf(item_on_tile) === -1) {
         return true
      }
      return false
   } else {
      var item_on_tile = get_item_on_tile(get_my_x() + tile, get_my_y())
      if( item_on_tile > 0 && types_to_ignore.indexOf(item_on_tile) === -1){
         return true
      }
      return false
   }
}

function should_go_west(tile, diag) {
   var types_to_ignore = this.types_to_ignore()
   if(diag === true){
      var item_on_tile = get_item_on_tile(get_my_x() - tile, get_my_y() + tile)
      if (item_on_tile > 0 && types_to_ignore.indexOf(item_on_tile) === -1) {
         return true
      }

      var item_on_tile = get_item_on_tile(get_my_x() - tile, get_my_y() - tile)
      if (item_on_tile > 0 && types_to_ignore.indexOf(item_on_tile) === -1) {
         return true
      }

      return false
   } else {
      var item_on_tile = this.get_item_on_tile(get_my_x() - tile, get_my_y())
      if (item_on_tile > 0 && types_to_ignore.indexOf(item_on_tile) === -1) {
         return true
      }
      return false
   }
}

function should_go_north(tile) {
   var item_on_tile = get_item_on_tile(get_my_x(), get_my_y() - tile)
   var types_to_ignore = this.types_to_ignore()
   if(item_on_tile > 0 && types_to_ignore.indexOf(item_on_tile) === -1){
      return true
   }
   return false
}

function should_go_south(tile) {
   var item_on_tile = get_item_on_tile(get_my_x(), get_my_y() + tile)
   var types_to_ignore = this.types_to_ignore()
   if(item_on_tile > 0 && types_to_ignore.indexOf(item_on_tile) === -1) {
      return true
   }
   return false
} 

// Optionally include this function if you'd like to always reset to a 
// certain board number/layout. This is useful for repeatedly testing your
// bot(s) against known positions.
//
//function default_board_number() {
//    return 123;
//}
