update system_settings
set value = regexp_replace(
              regexp_replace(
                regexp_replace(
                  regexp_replace(value,
                    '(\\+86-?)?181-?6368-?5410', '+8613574137503', 'g'
                  ),
                  '(\\+86-?)?135-?7413-?7503', '+8613574137503', 'g'
                ),
                '(\\+86-?)?176-?7404-?8404', '+8613574137503', 'g'
              ),
              '(\\+86-?)?1767-?404-?8404', '+8613574137503', 'g'
            )
where key like 'translations_%' or key like 'source_translations_%';