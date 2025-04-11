# Generated by Django 5.1.6 on 2025-02-16 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('author', models.CharField(max_length=30)),
                ('price', models.IntegerField()),
                ('language', models.CharField(max_length=20)),
                ('pages', models.IntegerField()),
                ('image', models.ImageField(upload_to='images')),
                ('pdf', models.FileField(upload_to='images')),
            ],
        ),
    ]
