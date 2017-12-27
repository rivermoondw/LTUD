/*
SQLyog Ultimate v11.11 (32 bit)
MySQL - 5.5.5-10.1.28-MariaDB : Database - tintuc
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`tintuc` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `tintuc`;

/*Table structure for table `article_categories` */

DROP TABLE IF EXISTS `article_categories`;

CREATE TABLE `article_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id danh mục',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'tên danh mục',
  `slug` varchar(255) DEFAULT NULL COMMENT 'tên danh mục không dấu',
  `order_sort` int(11) DEFAULT NULL COMMENT 'thứ tự xuất hiện trên thanh menu',
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'mô tả',
  `show` tinyint(1) DEFAULT NULL COMMENT 'hiện hoặc ẩn trên thanh menu',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Data for the table `article_categories` */

insert  into `article_categories`(`id`,`title`,`slug`,`order_sort`,`description`,`show`,`created_at`,`updated_at`) values (5,'Mobile','mobile',1,'Mobile',1,'2017-11-24 08:14:04','2017-12-16 12:35:37'),(6,'Tin ICT','tin-ict',2,'Tin ICT',1,'2017-11-24 08:49:53','2017-12-16 12:36:05'),(8,'Internet','internet',3,'Internet',1,'2017-12-03 16:26:51','2017-12-16 12:36:18'),(9,'Khám phá','kham-pha',4,'Khám phá',1,'2017-12-16 12:36:45','2017-12-27 22:59:38'),(10,'test','test',5,'test',0,'2017-12-27 23:02:25','2017-12-27 23:03:07');

/*Table structure for table `article_contents` */

DROP TABLE IF EXISTS `article_contents`;

CREATE TABLE `article_contents` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id bài viết',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'tiêu đề bài viết',
  `slug` varchar(255) DEFAULT NULL COMMENT 'tiêu đề không dấu',
  `introduction` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'giới thiệu bài viết',
  `url_img` varchar(255) DEFAULT NULL COMMENT 'url hình bài viết',
  `user_id` int(11) DEFAULT NULL COMMENT 'id người viết bài',
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'nội dung bài viết',
  `cat_id` int(11) DEFAULT NULL COMMENT 'id danh mục',
  `view_count` int(11) DEFAULT NULL COMMENT 'số lượt xem',
  `show` tinyint(1) DEFAULT NULL COMMENT 'hiện/ẩn bài viết',
  `hot_news` tinyint(1) DEFAULT NULL COMMENT 'tin nổi bật?',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `cat_id` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

/*Data for the table `article_contents` */

insert  into `article_contents`(`id`,`title`,`slug`,`introduction`,`url_img`,`user_id`,`content`,`cat_id`,`view_count`,`show`,`hot_news`,`created_at`,`updated_at`) values (4,'Bản cập nhật phần mềm mới tiết lộ việc Nokia 9 sở hữu camera kép?','ban-cap-nhat-phan-mem-moi-tiet-lo-viec-nokia-9-so-huu-camera-kep','Bản cập nhật mới nhất dành cho Nokia 5 có thêm hỗ trợ cho hệ thông camera kép với một ống kính góc rộng và một ống kính tele.','test1.jpg',1,'Bản cập nhật phần mềm mới tiết lộ việc Nokia 9 sở hữu camera kép?',5,1,0,0,'2017-12-16 13:13:46','2017-12-27 22:58:33'),(5,'Sau 20 năm tồn tại, dịch vụ nhắn tin AIM chính thức bị khai tử','sau-20-nam-ton-tai-dich-vu-nhan-tin-aim-chinh-thuc-bi-khai-tu','Vĩnh biệt tượng đài một thời của Internet.','test2.jpg',1,'Sau hai mươi năm tồn tại và phát triển, cuối cùng hang AOL cũng khai tử AOL Instant Messenger, dịch vụ nhắn tin còn được biết đến với cái tên AIM. Cái chết của AIM đã được AOL báo trước từ hồi tháng Mười, họ tuyên bố rằng dịch vụ này đã không còn được trọng dụng nữa – người ta đã có những cách thức liên lạc mới hơn, hiện đại và tiện lợi hơn.',6,1,1,0,'2017-12-16 13:14:20','2017-12-16 13:14:20'),(6,'Tiểu thuyết lừng danh Harry Potter vừa có thêm chương mới, nhưng không phải do J.K. Rowling viết mà được chắp bút bởi AI','tieu-thuyet-lung-danh-harry-potter-vua-co-them-chuong-moi-nhung-khong-phai-do-jk-rowling-viet-ma-duoc-chap-but-boi-ai','Câu chuyện về cậu phù thủy nhỏ Harry Potter được AI sáng tạo theo hướng mà ngay cả nữ nhà văn J.K Rowling cũng không thể ngờ tới.','test3.jpg',1,'Một công cụ trí tuệ nhân tạo đã đọc hết tất cả các quyển sách về cậu phù thủy nhỏ Harry Potter và tự động tạo ra một chương mới. Lúc đầu, đoạn văn bản mà cỗ máy này tạo ra có đôi chút khó hiểu, nhưng một số nhà văn đã “gọt giũa” ngôn từ sao cho dễ hiểu hơn. Tác phẩm có nội dung khá kỳ quặc và mang tính hài hước, thậm chí công cụ AI đã sao chép một phần phong cách viết từ nguyên tác của nữ nhà văn J.K. Rowling.',8,1,1,0,'2017-12-16 13:14:55','2017-12-16 13:14:55'),(7,'Video slow-motion về vũ điệu tia sét mà bạn chưa từng thấy trước đây','video-slow-motion-ve-vu-dieu-tia-set-ma-ban-chua-tung-thay-truoc-day','Video slow-motion về vũ điệu tia sét mà bạn chưa từng thấy trước đây','test5.jpg',1,'Không thể phủ nhận rằng một tia điện tạo thành vệt hàng trăm dặm trên bầu trời là một trong những bản demo ấn tượng nhất của mẹ thiên nhiên. Nhưng khi nhìn qua ống kính tốc độ cao của Dustin Farrell, những tia sét thậm chí còn trở nên ấn tượng hơn khi nó phát triển từ từ thành những đường zig-zag (theo các tình huống khác nhau) từ bầu trời đến mặt đất.',9,1,1,0,'2017-12-16 13:15:34','2017-12-16 13:15:34'),(8,'Video slow-motion về vũ điệu tia sét mà bạn chưa từng thấy trước đây','video-slow-motion-ve-vu-dieu-tia-set-ma-ban-chua-tung-thay-truoc-day','Video slow-motion về vũ điệu tia sét mà bạn chưa từng thấy trước đây','test4.jpg',1,'Không thể phủ nhận rằng một tia điện tạo thành vệt hàng trăm dặm trên bầu trời là một trong những bản demo ấn tượng nhất của mẹ thiên nhiên. Nhưng khi nhìn qua ống kính tốc độ cao của Dustin Farrell, những tia sét thậm chí còn trở nên ấn tượng hơn khi nó phát triển từ từ thành những đường zig-zag (theo các tình huống khác nhau) từ bầu trời đến mặt đất.',8,1,1,0,'2017-12-16 13:15:34','2017-12-16 13:15:34'),(9,'Huawei ra mắt Honor 9 Lite: màn hình 18:9, 4 camera, cấu hình ngang ngửa Nova 2i','huawei-ra-mat-honor-9-lite-man-hinh-18-9-4-camera-cau-hinh-ngang-ngua-nova-2i','Huawei vừa giới thiệu bản rút gọn của chiếc Honor 9 đã ra mắt hồi giữa năm nay với tên gọi Honor 9 Lite. Máy sở hữu cấu hình tầm trung và mức giá khá hấp dẫn, chỉ từ 182 USD.','huawei-ra-mat-honor-9-lite-man-hinh-18-9-4-camera-cau-hinh-ngang-ngua-nova-2i-1514115070822.jpg',1,'Honor 9 Lite trang bị màn hình 18:9 thế hệ mới, một xu hướng đặc trưng trong năm 2017. Màn hình máy cũng được bo cong với kính 2.5D ở cả mặt trước và sau. Sản phẩm có bốn tùy chọn màu sắc gồm xanh dương, xám, đen và trắng.\r\n\r\nMàn hình Honor 9 Lite có kích thước 5.65 inch, sử dụng tấm nền IPS LCD và độ phân giải Full HD+. Màn hình này thậm chí lớn hơn hiều so với Honor 9 chỉ với 5.15 inch. Do sở hữu kích thước màn hình lớn nên Honor 9 Lite buộc phải chuyển vị trí cảm biến vân tay ra mặt sau.',5,1,1,1,'2017-12-24 18:31:10','2017-12-24 18:31:10'),(11,'iPad 2018 sẽ trở nên hấp dẫn hơn nhờ trang bị công nghệ Face ID và thiết kế lấy cảm hứng từ iPhone X','ipad-2018-se-tro-nen-hap-dan-hon-nho-trang-bi-cong-nghe-face-id-va-thiet-ke-lay-cam-hung-tu-iphone-x','Apple sẽ \"nhân bản\" Face ID trên nhiều thiết bị ra mắt năm 2018, trong đó nổi bật nhất là iPad phiên bản mới sở hữu thiết kế giống iPhone X.','ipad-2018-se-tro-nen-hap-dan-hon-nho-trang-bi-cong-nghe-face-id-va-thiet-ke-lay-cam-hung-tu-iphone-x-1514389363419.jpg',1,'Sang năm 2018, những tính năng tốt nhất của iPhone X chắc chắn sẽ bị các đối thủ sao chép. Trong đó, đáng chú ý nhất phải kể đến công nghệ nhận diện khuôn mặt Face ID, vốn là rào cản lớn mà Táo khuyết phải rất nỗ lực vượt qua để kịp ra mắt sản phẩm vào tháng 9 vừa rồi. Hãng cũng cố gắng sản xuất kịp iPhone X trước nhiều tin đồn thiếu nguồn cung trầm trọng. Thời gian tới, Apple chắc chắn đủ sản lượng để đáp ứng nhu cầu của thị trường.\r\nThậm chí trong năm 2018, các thiết bị khác mang thương hiệu táo khuyết cũng sẽ được trang bị hệ thống nhận diện khuôn mặt, đặc biệt máy tính bảng iPad.\r\n\r\nNguồn tin thân cận trong chuỗi cung ứng laser phát xạ mặt VCSEL cho tờ Digitimes biết, doanh số của mặt hàng này sẽ tăng cao tăng trong năm tới. Nên nhớ, VCSEL là thành phần quan trọng bậc nhất tạo nên máy ảnh TrueDepth.\r\n\r\nCác nhà cung cấp VCSEL tại Đài Loan gồm VPEC, AWSC và Global Communication Semiconductors đang chuẩn bị đáp ứng đơn đặt hàng tăng mạnh vào năm 2018 vì nhiều nhà sản xuất smartphone cần bộ phận này để tích hợp trên smartphone của mình. Những cái tên quốc tế như Lumentum Holdings, Finisar, Princeton Optronics và Heptagon cũng đang đẩy mạnh sản xuất.\r\n\r\nFinisar nghe có vẻ quen thuộc, bởi Apple đã đầu tư 390 triệu USD vào đây. Nói đúng hơn, đó là bước đi nhằm đảm bảo nguồn cung VCSEL cho hàng loạt thiết bị iOS ra mắt năm 2018.\r\nApple dự kiến sẽ trang bị công nghê TrueDepth trên nhiều sản phẩm trình làng vào năm tới, trong đó có iPad phiên bản màn hình lớn. Báo cáo của tờ Digitimes còn cho biết Táo khuyết có thể sử dụng TrueDepth làm bàn đạp để chinh phục lĩnh vực tăng cường thực tế ảo.',5,1,1,1,'2017-12-27 22:42:43','2017-12-27 22:42:43'),(12,'Xin lỗi Mifan! Xiaomi Mi7 sẽ không có cảm biến vân tay trên màn hình','xin-loi-mifan-xiaomi-mi7-se-khong-co-cam-bien-van-tay-tren-man-hinh','Xiaomi Mi7 dự kiến sẽ chính thức lộ diện vào tháng 3/2018 tới.','xin-loi-mifan-xiaomi-mi7-se-khong-co-cam-bien-van-tay-tren-man-hinh-1514389444929.png',1,'Với sự bùng nổ mạnh mẽ của xu hướng màn hình tràn cạnh, hầu hết các nhà sản xuất đã phải đưa ra quyết định di dời cảm biến vân tay từ mặt trước ra phía sau lưng hoặc buộc phải loại bỏ luôn tính năng này giống như Apple đã làm với chiếc iPhone X của hãng.\r\n\r\nMặc dù trong một vài trường hợp, vị trí mới của cảm biến vân tay ở mặt sau rất tiện lợi trong việc sử dụng nhưng nó không có nghĩa đại đa số người dùng sẽ thích vị trí này. Rõ ràng việc có một thiết bị với cảm biến dấu vân tay ở phía trước vẫn luôn là điều tuyệt vời nhất, dễ dàng thích nghi trong hầu hết các tình huống sử dụng hàng ngày.\r\n\r\nLấy một ví dụ đơn giản, bạn sẽ không thể mở khóa thiết bị với cảm biến vân tay ở phía sau lưng khi máy đang được đặt trên mặt bàn,khi đó bạn buộc phải cầm máy lên mới có thể chạm vào cảm biến vân tay để mở khóa. Và dường như các nhà sản xuất cũng đều đã nghĩ tới vấn đề này và họ luôn không ngừng tìm tòi để có được phương án tốt nhất cũng như vị trí lý tưởng nhất cho cảm biến vân tay phục vụ người dùng tiện nhất.\r\n\r\nVà mới đây thế giới di động đã đón nhận một tin cực kì vui khi Synaptics chính thức công bố đã bắt đầu sản xuất đại trà cảm biến vân tay trên màn hình, và không ai khác chính là Vivo sẽ là nhà sản xuất đầu tiên được đem công nghệ này lên trên thiết bị cao cấp nhất Xplay7 của hãng trong thời gian tới. Vậy ngoài Vivo, còn những cái tên nào sẽ đem công nghệ hiện đại này lên trên sản phẩm của mình?',5,1,1,1,'2017-12-27 22:44:04','2017-12-27 22:44:04'),(13,'Kỳ lạ, Face ID trên iPhone X không thể dùng cho tính năng Family Purchase và không ai rõ vì sao','ky-la-face-id-tren-iphone-x-khong-the-dung-cho-tinh-nang-family-purchase-va-khong-ai-ro-vi-sao','Trước đây với Touch ID, các bậc phụ huynh dễ dàng chấp nhận thanh toán các ứng dụng, game của con mình...','ky-la-face-id-tren-iphone-x-khong-the-dung-cho-tinh-nang-family-purchase-va-khong-ai-ro-vi-sao-1514389535034.jpg',1,'Người dùng iPhone X mới phát hiện ra mình không thể dùng Face ID như một phương thức xác nhận thanh toán cho tùy chọn \"Hỏi khi mua\" (ask to buy) trong tính năng Family Purchase để cho phép những đứa con có thể mua ứng dụng hoặc game trên iOS. Thay vào đó, người dùng phải tự nhập tay tài khoản và password Apple ID để xác thực, chuyện mà trước đây giải quyết xong trong nháy mắt bằng một cú chạm tay trên các mẫu iPhone có Touch ID.\r\nĐiều này rõ ràng gây phiền phức và cả khó hiểu đối với người dùng mẫu iPhone cao cấp nhất của Apple. Với Touch ID, mọi việc dường như đã trơn tru trong việc tận dụng nó để làm các phương thức xác thực. Face ID cũng có thể dùng để xác thực thanh toán mua hàng trên App Store. Tuy nhiên việc không hoạt động với yêu cầu xác thực của tùy chọn \"Hỏi khi mua\" lại là thiếu sót lớn đối với người dùng gia đình.\r\n\r\nApple lần giới thiệu tính năng Face ID trên iPhone X như một phương thức bảo mật hoàn toàn mới thay thế cho cảm biến vân tay Touch ID trên thế hệ iPhone 8 về trước. Trên thực tế, Face ID hoạt động trơn tru với ngay cả các ứng dụng bên thứ ba hỗ trợ Touch ID. Chúng sẽ tự động chuyển qua dùng Face ID thay cho Touch ID khi hoạt động trên iPhone X mà không cần Apple hay nhà phát triển bổ sung bất cứ hàm lập trình nào. Vì thế thật đáng xấu hổ về sự cẩu thả của Apple khi bỏ quên sự hỗ trợ Face ID ngay trên các tính năng do chính mình tạo ra.\r\n\r\nVới nhiều bậc cha mẹ có con thường dùng thêm tính năng liên kết gia đình (Family) trên các thiết bị dùng iOS để quản lý con nhỏ mua các game, ứng dụng hay âm nhạc trên App Store thông qua một tài khoản thanh toán dùng chung chứa trong Family Purchase.\r\n\r\nTrên thực tế, iPhone X chỉ chứa duy nhất một dữ liệu khuôn mặt người dùng khiến nó khó để dùng chung với thành viên khác trong gia đình khó khăn hơn so với Touch ID. Tuy nhiên việc chia sẻ mật mã (passcode) để dùng máy vẫn áp dụng được. Với tùy chọn \"Hỏi khi mua\" trên iPhone X, các bậc phụ huynh phải tự nhập password của Apple ID khiến các thao tác trở nên rườm rà và phức tạp hơn.',5,1,1,0,'2017-12-27 22:45:35','2017-12-27 22:45:35'),(14,'Lý do Tesla trở thành bộ mặt của xe tương lai: Không phải động cơ điện, không phải tự lái','ly-do-tesla-tro-thanh-bo-mat-cua-xe-tuong-lai-khong-phai-dong-co-dien-khong-phai-tu-lai','Sớm hay muộn các đối thủ như BMW hay Toyota cũng sẽ có những chiếc xe chạy điện thuần túy. Nếu không thể tự phát triển công nghệ xe tự lái, họ có thể nhờ cậy đến Google. Nhưng điều đó không có nghĩa rằng Elon Musk cần phải lo lắng: các Model Tesla vẫn sở hữu một thế mạnh cực kỳ đơn giản nhưng lại cực kỳ khó bắt kịp.','ly-do-tesla-tro-thanh-bo-mat-cua-xe-tuong-lai-khong-phai-dong-co-dien-khong-phai-tu-lai-1514389653592.jpg',1,'Bất chấp những bản báo cáo tài chính thảm hại từ quý này sang quý khác, Tesla vẫn được coi là tương lai của xe hơi. Trong suốt 1 năm qua, hãng này đã luôn đứng trong top các hãng xe có trị giá thị trường lớn nhất thế giới. Thậm chí, trong nhiều tháng, Tesla còn vượt mặt cả GM lẫn Ford để trở thành thương hiệu xe hơi đứng số 1 nước Mỹ.\r\n\r\nHãy nhìn những phản hồi dành cho chiếc xe đầu kéo mới được Tesla ra mắt gần đây. Khi Pepsi đặt hàng vỏn vẹn... 100 xe, cổ phiếu Tesla đã tăng hẳn 7% trong vài ngày. Có vẻ như, cứ mỗi lần Elon Musk vén màn sản phẩm mới, người ta lại quên luôn về các bản báo cáo tài chính thảm hại. Đầu tháng 11, Tesla còn khiến người hâm mộ lo lắng vì chỉ sản xuất được vỏn vẹn... 222 chiếc Model 3 trong quý 3 vừa qua.\r\nNếu đặt câu hỏi \"Vì sao Tesla được yêu quý\", bạn sẽ càng thấy lo lắng hơn. Nhắc đến Tesla, 2 thế mạnh đầu tiên được nghĩ đến chắc chắn sẽ là \"động cơ điện\" và \"xe tự lái\". Thế nhưng, theo chân Tesla, tất cả các hãng xe đều có xu hướng \"điện hóa\" sản phẩm của mình. Trong cuộc đua xe tự lái, Tesla không chỉ phải chống chọi với các thương hiệu xe truyền thống mà còn phải đối chọi với cả những công ty \"thuần\" công nghệ như Uber hay Google.\r\n\r\nSớm hay muộn, các hãng đều sẽ có xe điện. Google và NVIDIA sẽ mang bán công nghệ xe tự lái cho cả thế giới. Nhưng may mắn thay, Tesla vẫn còn một thế mạnh mà không phải bất cứ ai đều có được.',6,1,1,1,'2017-12-27 22:47:33','2017-12-27 22:47:33'),(15,'Nhà sáng lập LeEco không biết đang ở đâu, bị phát lệnh yêu cầu về nước… trả nợ','nha-sang-lap-leeco-khong-biet-dang-o-dau-bi-phat-lenh-yeu-cau-ve-nuoc-tra-no','Uỷ ban chứng khoán Trung Quốc yêu cầu Jia (người hiện không biết đang ở đâu) phải quay trở về Trung...','nha-sang-lap-leeco-khong-biet-dang-o-dau-bi-phat-lenh-yeu-cau-ve-nuoc-tra-no-1514389986883.png',1,'Vào thứ 2 vừa qua, các nhà chức trách Trung Quốc đã công bố lệnh yêu cầu nhà sáng lập LeEco là Jia Yueting quay về nước trước 31/12 để giải quyết tình trạng tài chính hỗn độn đang diễn ra tại công ty do ông này sáng lập.\r\n\r\nLeEco chưa đưa ra phản hồi về thông tin này.\r\nTừng được xem là Netflix của Trung Quốc, LeEco đã mở rộng từ lĩnh vực stream video sang nhiều ngành công nghiệp khác gồm phim ảnh, điện thoại thông minh, giao thông… trước khi công ty này chìm trong đống nợ khổng lồ.\r\n\r\nJia đã thực hiện được tham vọng \"đánh bại Tesla\" vào năm ngoái khi LeEco đầu tư vào Faraday Future ở Mỹ. Thời điểm đó, công ty này còn có ý định mua lại cả công ty Vizio của Mỹ.\r\n\r\nTuy nhiên, công ty rơi vào khó khăn khi các khoản vay quá nhiều.\r\n\r\nTrước tình hình đó, Jia đã cắt giảm lương của mình xuống còn 1 NDT (tức là 15 cent) một năm vào năm 2016. Ông thừa nhận rằng công ty đã \"đốt tiền\" và \"tiêu pha vô tội vạ\" nhằm đáp ứng nhu cầu mở rộng.\r\n\r\nCông ty sau đó đã phải rút khỏi kế hoạch mua Vizio với giá 2 tỷ USD.\r\n\r\nJia từ chức khỏi vị trí chủ tịch và CEO LeEco sau khi Toà án Thượng Hải đã phong toả khối tài sản cá nhân trị giá hơn 180 triệu USD của ông này.',6,1,1,0,'2017-12-27 22:53:06','2017-12-27 22:53:06'),(16,'Việt Nam có thể cần một “phiên toà” để giải quyết vấn đề Uber, Grab','viet-nam-co-the-can-mot-phien-toa-de-giai-quyet-van-de-uber-grab','Tòa án Công lý Hội đồng châu Âu (CJEU) vừa ra phán quyết Uber cần được phân loại là một dịch vụ vận tải và chịu sự điều tiết như các hãng taxi khác.','viet-nam-co-the-can-mot-phien-toa-de-giai-quyet-van-de-uber-grab-1514390154738.jpg',1,'Tại Việt Nam, sau 2 năm thí điểm ứng dụng khoa học công nghệ hỗ trợ quản lý và kết nối hoạt động vận tải hành khách theo hợp đồng, Bộ GTVT vẫn tỏ ra “lúng túng” trong việc coi Uber, Grab là đơn vị cung cấp phần mềm hay đơn vị kinh doanh vận tải. Trước phán quyết của CJEU, liệu cơ quan quản lý của Việt Nam có sớm tìm ra định hướng?\r\n\r\nNgay sau khi có thông tin về phán quyết của Toà án Công lý Hội đồng châu Âu, ngày 25-12, Hiệp hội Taxi Hà Nội đã có văn bản gửi lên Bộ GTVT kiến nghị về việc thí điểm đối với loại hình này.\r\n\r\nÔng Nguyễn Công Hùng - Chủ tịch Hiệp hội Taxi Hà Nội cho rằng, với hàng loạt tồn tại sau hai năm thí điểm như, số lượng các phương tiện gia tăng nhanh chóng gây ảnh hưởng đến quy hoạch vận tải; việc nhận diện đối với các phương tiện thí điểm quy định chưa rõ ràng, gây ra nhiều khó khăn cho công tác hướng dẫn và điều tiết giao thông tại các địa phương; hay hầu hết các đơn vị vận tải là các hợp tác xã, hộ kinh doanh cá thể thời gian vừa qua đã thực hiện chưa tốt các quy định về quản lý phương tiện, quản lý con người, thực hiện nghĩa vụ với ngân sách, nghĩa vụ bảo hiểm với người lao động.',6,1,1,0,'2017-12-27 22:55:54','2017-12-27 22:55:54'),(17,'Những chiến binh Star Wars hóa thân lịch lãm trong bộ đồ Louis Vuitton và linh kiện máy tính','nhung-chien-binh-star-wars-hoa-than-lich-lam-trong-bo-do-louis-vuitton-va-linh-kien-may-tinh','Một nghệ sĩ đã khéo léo kết hợp chất liệu cao cấp của các nhãn hàng thời trang như Louis Vuitton với linh kiện của máy móc để tạo nên nhân vật Star War đầy ấn tượng.','nhung-chien-binh-star-wars-hoa-than-lich-lam-trong-bo-do-louis-vuitton-va-linh-kien-may-tinh-1514390237078.jpg',1,'Bộ phim khoa học viễn tưởng nổi tiếng Star Wars (Chiến tranh giữa các vì sao) chẳng liên quan gì tới các hãng thời trang danh tiếng thế giới như Louis Vuitton. Thế nhưng, nghệ sĩ Gabriel Dishaw đã sáng tạo khéo léo để kết hợp hai lĩnh vực điện ảnh và thời trang lại với nhau.',8,1,1,1,'2017-12-27 22:57:17','2017-12-27 22:57:17');

/*Table structure for table `comments` */

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `article_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `comments` */

/*Table structure for table `role_permission` */

DROP TABLE IF EXISTS `role_permission`;

CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `role_id` int(11) DEFAULT NULL COMMENT 'Id vai trò',
  `permission` varchar(255) DEFAULT NULL COMMENT 'Đường dẫn các chức năng mà vai trò được quyền thực hiện',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=latin1;

/*Data for the table `role_permission` */

insert  into `role_permission`(`id`,`role_id`,`permission`) values (10,8,'/admin/role/list'),(11,8,'/admin/role/add'),(12,8,'/admin/role/edit'),(13,8,'/admin/category/add'),(14,8,'/admin/category/edit'),(15,8,'/admin/article/list'),(168,1,'/admin/role/list'),(169,1,'/admin/role/add'),(170,1,'/admin/role/edit'),(171,1,'/admin/role/del'),(172,1,'/admin/category/list'),(173,1,'/admin/category/add'),(174,1,'/admin/category/edit'),(175,1,'/admin/category/del'),(176,1,'/admin/article/list'),(177,1,'/admin/article/add'),(178,1,'/admin/article/edit'),(179,1,'/admin/article/del'),(180,1,'/admin/user/list'),(181,1,'/admin/user/add'),(182,1,'/admin/user/edit'),(183,1,'/admin/user/del'),(193,9,'/admin/category/list'),(194,9,'/admin/category/add'),(195,9,'/admin/category/edit'),(196,9,'/admin/article/list'),(197,9,'/admin/article/add'),(198,9,'/admin/article/edit'),(199,9,'/admin/user/list'),(200,9,'/admin/user/add'),(201,9,'/admin/user/edit');

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id vai trò',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Tên vai trò',
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'Mô tả',
  `created_at` datetime DEFAULT NULL COMMENT 'Thời điểm tạo',
  `updated_at` datetime DEFAULT NULL COMMENT 'Thời điểm update',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Data for the table `roles` */

insert  into `roles`(`id`,`title`,`description`,`created_at`,`updated_at`) values (1,'admin','admin','2017-12-17 15:30:55','2017-12-19 20:42:23'),(2,'Người quản lý danh mục','Quản lý danh mục','2017-12-17 15:31:25','2017-12-17 15:31:25'),(3,'Người viết bài','Viết bài','2017-12-17 15:31:35','2017-12-17 15:31:35'),(9,'Admin','Admin','2017-12-18 22:47:11','2017-12-27 23:05:04');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id tài khoản',
  `email` varchar(255) DEFAULT NULL COMMENT 'Email',
  `password` varchar(255) DEFAULT NULL COMMENT 'Mật khẩu',
  `salt` varchar(255) DEFAULT NULL COMMENT 'Chuỗi bảo mật',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Họ tên người dùng',
  `avatar` varchar(255) DEFAULT NULL COMMENT 'Đường dẫn ảnh đại diện',
  `role_id` int(11) DEFAULT NULL COMMENT 'Id vai trò',
  `created_at` datetime DEFAULT NULL COMMENT 'Thời điểm tạo',
  `updated_at` datetime DEFAULT NULL COMMENT 'Thời điểm update',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`password`,`salt`,`name`,`avatar`,`role_id`,`created_at`,`updated_at`) values (1,'loc@gmail.com','13243c9ba4ce8d1135bf02395107520c','ZvbH5jKXosQyo7Kr56wzdxIJJ7daX3TRRNNbtSQVGR8RfzFHqn7DqHl2M03Fik88BhWuQICII2EytsLOuXCZZTRijIrWreIiBzGuOGMJinuGrmdFshi7VoLQ114AwL0jiikrzFtaz8wVPrHRBgVF2MEYax7Vcll6JLn7fwx3HjTjfBQ0bAXgCzL8i8RHSwXummGeLiUiPFCsuiOOW1QHyFw8Bc74HmtLJkwrQ0XXhIVx8QKqYq6mvMv9JqmGMb8','Hoang Loc','hvl-123.jpg',1,NULL,NULL),(2,'loc1@gmail.com','13243c9ba4ce8d1135bf02395107520c','ZvbH5jKXosQyo7Kr56wzdxIJJ7daX3TRRNNbtSQVGR8RfzFHqn7DqHl2M03Fik88BhWuQICII2EytsLOuXCZZTRijIrWreIiBzGuOGMJinuGrmdFshi7VoLQ114AwL0jiikrzFtaz8wVPrHRBgVF2MEYax7Vcll6JLn7fwx3HjTjfBQ0bAXgCzL8i8RHSwXummGeLiUiPFCsuiOOW1QHyFw8Bc74HmtLJkwrQ0XXhIVx8QKqYq6mvMv9JqmGMb8','loc',NULL,1,'2017-12-18 21:54:33','2017-12-18 21:54:33'),(3,'ztblueskytz@gmail.com','01532be08ff119b47e44f74d63447b4f','hkOMKyZqVmH0gABbOpl6PmWM5Mle8Te3ZXwgafkiyONyD0HW0RWF2UGW2fItbql3x4FW56Tqyo51sOYIbLp1N9kzCMCpdAKxl3rdANbzBgpjZrjrngYv2vQHBuOy0a0bYs5X8DKvZ8D9CXAHp1SKUBb5Ayl96Bl71NZGvqK0XVWzp6LD8sGynBiw4IP19VisxIHDxP37cWU0md2lnS7pNRljcb0x5ATEzrUyHeS04m6TJemDNMKrAdzWhoUtDSb','Hoang Loc',NULL,9,'2017-12-19 20:52:14','2017-12-19 20:52:14'),(11,'loc2@gmail.com','fac0c1f57bd80b4616b4e69124f1a637','ETTq7msLnjDIPSPkdN5P8xYXLr0xE8VdB2PnqPNjPbFK3VCGWeskYGFFAsycYpL5D3A57A3trKsrfJ0c4CQnofMd3NMZaQA0LZVZG0GxCXygkRpINUvVK91JxXgdyUc2SDtnRQyBaNzForvppifdgZO1SX85iiahJz25cwCiLxlkI61FnkSKbPtHS2xoFBWNOsArAdysSE8iilFFPACrWsoobM1oZZlYumQRY58KxfLMntbuOhWseaNLdnkeZjD','123123',NULL,1,'2017-12-19 21:56:40','2017-12-19 21:56:40'),(12,'loc4@gmail.com','04bb070cdcfaa68ba5103fbe1eb7fca7','Hor3y6BFNRvZzia0VOUHeWOm75BqhCGTEqfzA0ETD6uQWa8reZYDs8RlsJXxGkMIt8fGB0WfYlMJ35Vh165qW5iLyaLKibr9aES5nyrJOKx7bj4sgCMpJpQ4if2FLsdiAVcjKD8hTcWJwvOMnKCLsAsbogZCvdsbejZtqMvvRvMqGmLSt2RnOgWjsEDoKZ2VuBo2LH7eLSuHBg5mcsX9ni1TrU981FW3ipY9exo096JUy2LSD97Y80tumTH1kLT','123123','1',0,'2017-12-19 22:03:41','2017-12-19 22:03:41'),(13,'loc5@gmail.com','91ff4e0f7c362bbad33e5f6818a1ea37','1WYVOfxklNnMjXcBsE9K5A4MsZFReLzTB7ntOBftEmUW16JdYjpE9IPzOXvF7q7gs35Zb3Z9aJrTNtgXKaOn72mMFZUdHQeCovxQKojJAOCSmYjMvc59J29mfAj6Xx2Damt0hP96rp0HUQPkTlw1JUNVnpPepTpMQguzNtIlIkaK8XgnnafgWqWfMkw7igee9QKYM93Kmtyal3y0uRT8uvHjrUdsR1mhakfEM1z9eFn1CMLiA3EARZ4zLQ9aBZm','12323','1',0,'2017-12-19 22:04:42','2017-12-19 22:04:42'),(14,'loc7@gmail.com','93613bb7fbd22d2fe60b17aa45593514','Sgx2OQ6tewaQ55FNRNv60d1Nfb5ntb0e6MPMQVA35E9FY9ALQI2Bx8R7E38xf2PGnAEkCe7CzyZWJb93biBL7GoMVLTvKd7KgYzskaeTaZtc1zZs0BiD21XiXRUQtYJW1ByzYIZNxrtvNSuOPek4gKwa5jteSjB5EQiGB6atcVR5GJjMe5kQMG0OGVm9nByBHviXd1PQf69UrgbCgTLrADl95MgI7YKHM8AZgMsz2lHKhvZCDjBQYI1nhlYCYLw','123123','Screenshot_2.png',1,'2017-12-19 22:13:51','2017-12-19 22:13:51'),(15,'loc6@gmail.com','185f917e53ccd2b42db2a6c991c3e5d3','otDdFZ6vsspUwZiE3lEIDRQsfQpKDtkedCJSwvlFBCOlDewYbLURCpUif7CLqL5Rb5yffu5Iryd3bATzwFs1heCbqDphH0MIDEfJIWaFsFIGILaV3C4zOspnD0RIpLJY8J7bwOKhEWf1B58U2TD5Vx7mRTQ3UDpzkNE4m5hdicNC3FQTFSdzrpPbQYcnwermOkzTZOn8mrvFdWlF21lRhciGpPVxQQr37OPHJspaN2UQ52zsLyO9wrAhNHUCtUo','123123','hoang-loc-1513699052515.png',1,'2017-12-19 22:57:32','2017-12-19 22:57:32');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
