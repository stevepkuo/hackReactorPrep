/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
var diary = [
  {
    day: 'Mon',
    bookings: {
      '9am': '',
      '10am': 'Bowser',
      '11am': '',
      '12pm': '',
      '1pm': '',
      '2pm': 'whatsupyo'
    }
  },
  {
    day: 'Tue',
    bookings: {
      '9am': '',
      '10am': '',
      '11am': '',
      '12pm': '',
      '1pm': 'Fifi',
      '2pm': 'bruno'
    }
  }
];
var timesOfDay = [
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm'
];

var max = function (num1, num2) {
  if (num1 < num2) return num2;
  else return num1;
}

var printSchedule = function (diary) {
  var entireString = '';
  var guardband = 3;
  //padding function(item, spaces)
  //  return padded string;
  function padString(eachString, totalSpaces) {
    if (eachString.length < totalSpaces) {
      var gap = totalSpaces - eachString.length;
      return eachString + Array(gap + 1).join(' ');
    }
    else return eachString;
  }
  
  //get required spaces for 1st column (9am, 10am)
  //   for timesOfDay
  //     max Length + guardband;
  firstColumnSize = timesOfDay.map(function (eachItem) {
    return eachItem.length;
  }).reduce(max
  ) + guardband;
  
  //get required spaces for Mon, Name columns
  //   for diary.day
  //     max Length + guardband;
  //   for bookings
  //     max name_length + guardband;
  otherColumnSize = max(
    
    diary.map(function (eachEntry) {
      return eachEntry.day.length;
    }).reduce(max
    ),
    
    diary.map(function (eachEntry) {
      var eachBookings = eachEntry.bookings;
      var bookingNames = timesOfDay.map(function (eachTime) {
        return eachBookings[eachTime].length;
      })
      return bookingNames.reduce(max
      );
    }).reduce(max
    )
  ) + guardband;
  
  
  //print header
  //  blank, mon, tue, wed, thurs
  var headerString = '';
  headerString += padString('', firstColumnSize);
  diary.forEach(function (eachEntry) {
    headerString += padString(eachEntry.day, otherColumnSize);
  });
  console.log(headerString);
  entireString += headerString;
  
  //print row for each timesOfDay
  //  time, Bowser, fifi, "", ""
  timesOfDay.forEach(function (eachTimeSlot) {
    var otherString = '';
    otherString += padString(eachTimeSlot, firstColumnSize);
    diary.forEach(function (eachEntry) {
      otherString += padString(eachEntry.bookings[eachTimeSlot], otherColumnSize);
    });
    console.log(otherString);
    entireString+= "\n" + otherString;
  });
  return entireString;
}

printSchedule(diary);
/*
       Mon         Tue         
9am                            
10am   Bowser                  
11am                           
12pm                           
1pm                Fifi        
2pm    whatsupyo   bruno       
*/