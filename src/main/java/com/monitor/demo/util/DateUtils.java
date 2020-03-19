package com.monitor.demo.util;

import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import org.joda.time.Interval;
import org.joda.time.Period;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.lang.management.ManagementFactory;
import java.util.Date;

/**
 *
 * @author Administrator
 */
public class DateUtils {

    public static final String STANDARD_FORMAT = "yyyy-MM-dd HH:mm:ss";



    public static Date strToDate(String dateTimeStr, String formatStr){
        DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern(formatStr);
        DateTime dateTime = dateTimeFormatter.parseDateTime(dateTimeStr);
        return dateTime.toDate();
    }

    public static String dateToStr(Date date,String formatStr){
        if(date == null){
            return StringUtils.EMPTY;
        }
        DateTime dateTime = new DateTime(date);
        return dateTime.toString(formatStr);
    }

    public static DateTime dateToDateTimeWithFormat(Date date,String formatStr){
        if(date == null){
            return null;
        }
        DateTime dateTime = new DateTime(date);
        String dateStr = dateTime.toString(formatStr);
        return DateTime.parse(dateStr);
    }

    public static Date strToDate(String dateTimeStr){
        DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern(STANDARD_FORMAT);
        DateTime dateTime = dateTimeFormatter.parseDateTime(dateTimeStr);
        return dateTime.toDate();
    }

    public static String dateToStr(Date date){
        if(date == null){
            return StringUtils.EMPTY;
        }
        DateTime dateTime = new DateTime(date);
        return dateTime.toString(STANDARD_FORMAT);
    }

    /**
     * 计算相差天时分
     * @param startTime
     * @param endTime
     * @return
     */
    public static String byTimes(Date startTime, Date endTime) {
        Interval interval = new Interval(startTime.getTime(), endTime.getTime());
        Period period = interval.toPeriod();

        return period.getYears() +
                "年" +
                period.getMonths() +
                "月" +
                period.getWeeks() +
                "周" +
                period.getDays() +
                "天" +
                period.getHours() +
                "时" +
                period.getMinutes() +
                "分";
    }

    /**
     * 获取当天的00:00:00时间
     *
     * @param date 日期
     * @return Date
     */
    public static Date dayStartDate(Date date) {
        String dateStr = dateToStr(date);
        return strToDate(dateStr, "yyyy-MM-dd 00:00:00");
    }


    public static Date formatToStdDate(Date date) {
        String dateStr = dateToStr(date);
        return strToDate(dateStr, STANDARD_FORMAT);
    }
    /**
     * 获取当天的23:59:59时间
     * 
     * @param date 日期
     * @return Date
     */
    public static Date dayEndDate(Date date) {
        String dateStr = dateToStr(date);
        Date result = strToDate(dateStr, "yyyy-MM-dd 00:00:00");
        return org.apache.commons.lang3.time.DateUtils.addSeconds(org.apache.commons.lang3.time.DateUtils.addDays(result, 1), -1);
    }

    public static void main(String[] args) {
        System.out.println(DateUtils.dateToStr(new Date(),"yyyy-MM-dd HH:mm:ss"));
        System.out.println(DateUtils.strToDate("2010-01-01 11:11:11","yyyy-MM-dd HH:mm:ss"));

    }

    public static Date getServerStartDate() {
        long time = ManagementFactory.getRuntimeMXBean().getStartTime();
        return new Date(time);
    }

    /**
     * 计算时间差
     */
    public static String getDatePoor(Date endDate, Date nowDate) {
        long nd = 1000 * 24 * 60 * 60;
        long nh = 1000 * 60 * 60;
        long nm = 1000 * 60;
        // long ns = 1000;
        // 获得两个时间的毫秒时间差异
        long diff = endDate.getTime() - nowDate.getTime();
        // 计算差多少天
        long day = diff / nd;
        // 计算差多少小时
        long hour = diff % nd / nh;
        // 计算差多少分钟
        long min = diff % nd % nh / nm;
        // 计算差多少秒//输出结果
        // long sec = diff % nd % nh % nm / ns;
        return day + "天" + hour + "小时" + min + "分钟";
    }

    public static Date getNowDate() {
        return new Date();
    }
}
