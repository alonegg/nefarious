# Generated by Django 3.0.2 on 2024-06-09 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nefarious', '0076_auto_20240609_1342'),
    ]

    operations = [
        migrations.AddField(
            model_name='watchtvseasonrequest',
            name='date_updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
