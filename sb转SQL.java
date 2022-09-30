public class sb转SQL {
    public static void main(String[] args) {
        StringBuffer sql = new StringBuffer();
        sql.append("    select to_char(user_id) user_id,   ");
        sql.append("           user_name,                  ");
        sql.append("           name,                       ");
        sql.append("           sex,                        ");
        sql.append("           email,                      ");
        sql.append("           phone,                      ");
        sql.append("           birthday,                   ");
        sql.append("           s.status,                   ");
        sql.append("           last_logintime,             ");
        sql.append("           s.sn,                       ");
        sql.append("           h.hall_name ,         ");
        sql.append("           s.operator,                 ");
        sql.append("           s.operator_date,            ");
        sql.append("           o.org_no ,             ");
        sql.append("           o.org_name           ");
        sql.append("      from sys_users s                 ");
        sql.append("      LEFT join c_business_hall h      ");
        sql.append("        on s.sn = h.sn                 ");
        sql.append("      LEFT JOIN o_org o                ");
        sql.append("        ON s.org_no = o.org_no         ");
        sql.append("     WHERE 1 = 1                       ");
        System.out.println(sql);
    }
}
