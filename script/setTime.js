//convert number of minutes to apropriate time string
function setTime(minutes) {
    if (minutes >= 60) {
        let m = minutes % 60;
        let h = (minutes - m) / 60;
        if (h === 1) {
            h = "שעה";
        } else if (h === 2) {
            h = "שעתיים";
        } else {
            h = h + " שעות";
        }
        if (m === 0) {
            m = "";
        } else if (m === 15) {
            m = " ורבע";
        } else if (m === 30) {
            m = " וחצי";
        } else {
            m = ` ו-${m} דקות`;
        }
        return h + m;
    } else {
        if (minutes === 15) {
            return "רבע שעה";
        }
        if (minutes === 30) {
            return "חצי שעה";
        }
        return minutes + " דקות";
    }
}
