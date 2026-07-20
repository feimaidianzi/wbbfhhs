update system_settings
set value = regexp_replace(
              regexp_replace(
                regexp_replace(
                  regexp_replace(value,
                    '\\y(\\+86-?)?181-?6368-?5410\\y', '+8613574137503', 'g'
                  ),
                  '\\y(\\+86-?)?135-?7413-?7503\\y', '+8613574137503', 'g'
                ),
                '\\y(\\+86-?)?176-?7404-?8404\\y', '+8613574137503', 'g'
              ),
              '\\y(\\+86-?)?1767-?404-?8404\\y', '+8613574137503', 'g'
            )
where key like 'translations_%' or key like 'source_translations_%';